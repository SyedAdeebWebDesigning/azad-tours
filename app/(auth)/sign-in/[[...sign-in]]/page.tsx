"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function SignInForm() {
	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [useBackupCode, setUseBackupCode] = useState(false);
	const [displayTOTP, setDisplayTOTP] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFirstStage = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			const result = await signIn!.create({
				identifier: email,
				password,
			});

			if (result.status === "needs_second_factor") {
				setDisplayTOTP(true);
			} else if (result.status === "complete") {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				isLoaded && (await setActive({ session: result.createdSessionId }));
				router.push("/");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Something went wrong");
		}
	};

	const handleSecondStage = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		try {
			const result = await signIn!.attemptSecondFactor({
				strategy: useBackupCode ? "backup_code" : "totp",
				code,
			});

			if (result.status === "complete") {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				isLoaded && (await setActive({ session: result.createdSessionId }));
				router.push("/");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.errors?.[0]?.message || "Invalid code");
		}
	};

	const handleGoogleSignIn = async () => {
		await signIn!.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-muted/40">
			<Card className="w-full max-w-md shadow-none border-none rounded-2xl">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						{displayTOTP ? "Verify your account" : "Sign in to your account"}
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{!displayTOTP && (
						<>
							<Button
								variant="outline"
								className="w-full flex items-center justify-center gap-2"
								onClick={handleGoogleSignIn}>
								<FcGoogle />
								Continue with Google
							</Button>

							<div className="flex items-center gap-2">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">OR</span>
								<Separator className="flex-1" />
							</div>

							<form onSubmit={handleFirstStage} className="space-y-4">
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

								<Button type="submit" disabled={!isLoaded} className="w-full">
									{isLoaded ? "Sign In" : "Loading..."}
								</Button>
							</form>
						</>
					)}

					<AnimatePresence>
						{displayTOTP && (
							<motion.form
								key="otp-form"
								onSubmit={handleSecondStage}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="space-y-4">
								<div className="space-y-1">
									<Label>Authentication Code</Label>
									<Input
										value={code}
										onChange={(e) => setCode(e.target.value)}
										required
									/>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										checked={useBackupCode}
										onCheckedChange={() => setUseBackupCode((prev) => !prev)}
									/>
									<Label className="text-sm">Use backup code</Label>
								</div>

								{error && <p className="text-sm text-red-500">{error}</p>}

								<Button type="submit" disabled={!isLoaded} className="w-full">
									Verify
								</Button>
							</motion.form>
						)}
					</AnimatePresence>
				</CardContent>
				<div>
					<p className="mt-4 text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="text-blue-600 hover:underline">
							Sign up
						</Link>
					</p>
				</div>
			</Card>
		</div>
	);
}
