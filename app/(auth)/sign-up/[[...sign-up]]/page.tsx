"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			await signUp!.create({
				emailAddress: email,
				password,
			});

			// Send email verification
			await signUp!.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			setPendingVerification(true);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Something went wrong");
		}
	};

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			const completeSignUp = await signUp!.attemptEmailAddressVerification({
				code,
			});

			if (completeSignUp.status === "complete") {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				isLoaded &&
					(await setActive({ session: completeSignUp.createdSessionId }));
				router.push("/");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Invalid code");
		}
	};

	const handleGoogleSignUp = async () => {
		await signUp!.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-muted/40">
			<Card className="w-full max-w-md border-none shadow-none rounded-2xl">
				<div id="clerk-captcha" />
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						{pendingVerification ? "Verify your email" : "Create account"}
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{!pendingVerification && (
						<>
							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2"
								onClick={handleGoogleSignUp}>
								<FcGoogle />
								Continue with Google
							</Button>

							<div className="flex items-center gap-2">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">OR</span>
								<Separator className="flex-1" />
							</div>

							<form onSubmit={handleSignUp} className="space-y-4">
								<div className="space-y-1">
									<Label>Email</Label>
									<Input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-1">
									<Label>Password</Label>
									<Input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>

								{error && <p className="text-sm text-red-500">{error}</p>}

								<Button
									type="submit"
									disabled={!isLoaded}
									className="w-full cursor-pointer">
									{isLoaded ? "Sign Up" : "Loading..."}
								</Button>
							</form>
						</>
					)}

					<AnimatePresence>
						{pendingVerification && (
							<motion.form
								key="verify-form"
								onSubmit={handleVerify}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="space-y-4">
								<div className="space-y-1">
									<Label>Verification Code</Label>
									<Input
										value={code}
										onChange={(e) => setCode(e.target.value)}
										required
									/>
								</div>

								{error && <p className="text-sm text-red-500">{error}</p>}

								<Button type="submit" className="w-full">
									Verify Email
								</Button>
							</motion.form>
						)}
					</AnimatePresence>
				</CardContent>

				<div className="">
					<p className="mt-4 text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link href="/sign-in" className="text-blue-600 hover:underline">
							Sign in
						</Link>
					</p>
				</div>
			</Card>
		</div>
	);
}
