/* eslint-disable @typescript-eslint/no-explicit-any */
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

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (!isLoaded || !signUp) return null;

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		try {
			await signUp.create({
				emailAddress: email,
				password,
				firstName,
				lastName,
			});

			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			setPendingVerification(true);
		} catch (err: unknown) {
			const message =
				typeof err === "object" &&
				err !== null &&
				"errors" in err &&
				Array.isArray((err as any).errors)
					? (err as any).errors[0]?.message
					: "Something went wrong";

			setError(message);
		}
	};

	const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		try {
			const result = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId });
				router.push("/");
			}
		} catch (err: unknown) {
			const message =
				typeof err === "object" &&
				err !== null &&
				"errors" in err &&
				Array.isArray((err as any).errors)
					? (err as any).errors[0]?.message
					: "Invalid verification code";

			setError(message);
		}
	};

	const handleGoogleSignUp = async () => {
		await signUp.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-muted/40">
			<Card className="w-full max-w-md border-none shadow-none rounded-2xl">
				{/* Smart CAPTCHA container */}
				<div id="clerk-captcha" />

				<CardHeader>
					<CardTitle className="text-2xl text-center">
						{pendingVerification ? "Verify your email" : "Create account"}
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4">
					{!pendingVerification && (
						<>
							{/* Google */}
							<Button
								type="button"
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
								{/* Name row */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-1">
										<Label>First Name</Label>
										<Input
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											required
										/>
									</div>

									<div className="space-y-1">
										<Label>Last Name</Label>
										<Input
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											required
										/>
									</div>
								</div>

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
									Sign Up
								</Button>
							</form>
						</>
					)}

					{/* Verification Form */}
					<AnimatePresence>
						{pendingVerification && (
							<motion.form
								key="verify-form"
								onSubmit={handleVerify}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
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

				<div className="pb-6">
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
