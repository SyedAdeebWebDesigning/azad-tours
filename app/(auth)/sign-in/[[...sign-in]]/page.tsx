/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [displayOTP, setDisplayOTP] = useState(false);
	const [otp, setOtp] = useState("");

	const [verificationState, setVerificationState] = useState<
		"idle" | "checking" | "success" | "error"
	>("idle");

	const [isSigningIn, setIsSigningIn] = useState(false);

	const [error, setError] = useState<string | null>(null);

	if (!isLoaded || !signIn) return null;

	// EMAIL + PASSWORD LOGIN
	const handleFirstStage = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSigningIn(true);

		try {
			const result = await signIn.create({
				identifier: email,
				password,
			});

			if (result.status === "needs_second_factor") {
				await signIn.prepareSecondFactor({
					strategy: "email_code",
				});

				setDisplayOTP(true);
			} else if (result.status === "complete") {
				await setActive({ session: result.createdSessionId });
				router.push("/");
			}
		} catch (err: any) {
			const code = err?.errors?.[0]?.code;

			if (code === "form_identifier_not_found") {
				setError("No account found with this email.");
			} else if (code === "form_password_incorrect") {
				setError("Incorrect password.");
			} else {
				setError(err?.errors?.[0]?.message || "Something went wrong.");
			}
		} finally {
			setIsSigningIn(false);
		}
	};

	// OTP VERIFY
	const verifyCode = async (codeValue: string) => {
		try {
			setVerificationState("checking");

			const result = await signIn.attemptSecondFactor({
				strategy: "email_code",
				code: codeValue,
			});

			if (result.status === "complete") {
				setVerificationState("success");

				setTimeout(async () => {
					await setActive({ session: result.createdSessionId });
					router.push("/");
				}, 800);
			}
		} catch (err: any) {
			setVerificationState("error");

			setTimeout(() => {
				setVerificationState("idle");
				setOtp("");
			}, 1500);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-muted/40">
			<Card className="w-full max-w-md shadow-none border-none rounded-2xl">
				<div id="clerk-captcha" />

				<CardHeader>
					<CardTitle className="text-2xl text-center">
						{displayOTP ? "Verify your account" : "Sign in to your account"}
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6">
					{!displayOTP && (
						<>
							<SignIn.Root routing="path" path="/sign-in">
								<Clerk.Connection asChild name="google">
									<Button variant={"ghost"} className="w-full">
										<FcGoogle />
										Sign in with Google
									</Button>
								</Clerk.Connection>
							</SignIn.Root>

							<div className="flex items-center gap-2">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">OR</span>
								<Separator className="flex-1" />
							</div>

							{/* EMAIL LOGIN */}
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

								{error && (
									<p className="text-sm text-red-500 text-center">
										{error}{" "}
										<Link href="/sign-up" className="text-blue-600 underline">
											Create account
										</Link>
									</p>
								)}

								<Button type="submit" className="w-full" disabled={isSigningIn}>
									{isSigningIn ? (
										<div className="flex items-center justify-center gap-2">
											<Loader2 className="h-4 w-4 animate-spin" />
											Signing in...
										</div>
									) : (
										"Sign In"
									)}
								</Button>
							</form>
						</>
					)}

					{/* OTP STAGE */}
					<AnimatePresence>
						{displayOTP && (
							<motion.div
								key="otp-stage"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="space-y-6">
								<Label className="text-center block">
									Enter Authentication Code
								</Label>

								<div className="flex flex-col items-center gap-4">
									<InputOTP
										maxLength={6}
										value={otp}
										onChange={async (value) => {
											setOtp(value);
											if (value.length === 6) {
												await verifyCode(value);
											}
										}}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>

									<AnimatePresence mode="wait">
										{verificationState === "checking" && (
											<motion.div
												key="checking"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="flex items-center justify-center">
												<Loader2 className="h-6 w-6 mr-2 animate-spin text-muted-foreground" />
												<p className="text-sm text-muted-foreground">
													Checking code...
												</p>
											</motion.div>
										)}

										{verificationState === "success" && (
											<motion.div
												key="success"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0 }}
												className="flex items-center justify-center">
												<CheckCircle2 className="h-6 w-6 mr-2 text-green-500" />
												<p className="text-sm text-green-500">
													Verification successful!
												</p>
											</motion.div>
										)}

										{verificationState === "error" && (
											<motion.div
												key="error"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0 }}
												className="flex items-center justify-center">
												<XCircle className="h-6 w-6 mr-2 text-red-500" />
												<p className="text-sm text-red-500">
													Invalid code, please try again.
												</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</CardContent>

				<div className="pb-6">
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
