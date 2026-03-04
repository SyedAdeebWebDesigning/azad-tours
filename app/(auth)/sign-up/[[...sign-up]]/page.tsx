/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function SignUpForm() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [otp, setOtp] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);

	const [error, setError] = useState<string | null>(null);

	const [verificationState, setVerificationState] = useState<
		"idle" | "checking" | "success" | "error"
	>("idle");

	const [isSigningUp, setIsSigningUp] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);

	if (!isLoaded || !signUp) return null;

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsSigningUp(true);

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
		} catch (err: any) {
			setError(err?.errors?.[0]?.message || "Something went wrong");
		} finally {
			setIsSigningUp(false);
		}
	};

	const verifyCode = async (fullCode: string) => {
		try {
			setVerificationState("checking");

			const result = await signUp.attemptEmailAddressVerification({
				code: fullCode,
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
			setError(err?.errors?.[0]?.message || "Invalid code");

			setTimeout(() => {
				setVerificationState("idle");
				setOtp("");
			}, 1500);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			setIsGoogleLoading(true);

			await signUp.authenticateWithRedirect({
				strategy: "oauth_google",
				redirectUrl: "/sso-callback",
				redirectUrlComplete: "/",
			});
		} catch {
			setIsGoogleLoading(false);
		}
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

				<CardContent className="space-y-6">
					{!pendingVerification && (
						<>
							{/* GOOGLE BUTTON */}
							<Button
								type="button"
								variant="outline"
								className="w-full flex items-center justify-center gap-2"
								onClick={handleGoogleSignUp}
								disabled={isGoogleLoading}>
								{isGoogleLoading ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<FcGoogle />
								)}

								{isGoogleLoading ? "Redirecting..." : "Continue with Google"}
							</Button>

							<div className="flex items-center gap-2">
								<Separator className="flex-1" />
								<span className="text-xs text-muted-foreground">OR</span>
								<Separator className="flex-1" />
							</div>

							{/* SIGN UP FORM */}
							<form onSubmit={handleSignUp} className="space-y-4">
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

								<Button type="submit" className="w-full" disabled={isSigningUp}>
									{isSigningUp ? (
										<div className="flex items-center justify-center gap-2">
											<Loader2 className="h-4 w-4 animate-spin" />
											Creating account...
										</div>
									) : (
										"Sign Up"
									)}
								</Button>
							</form>
						</>
					)}

					{/* OTP STAGE */}
					<AnimatePresence>
						{pendingVerification && (
							<motion.div
								key="verify-form"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="space-y-6">
								<Label className="text-center block">
									Enter Verification Code
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
												className="flex items-center justify-center"
												exit={{ opacity: 0 }}>
												<Loader2 className="h-6 w-6 mr-1 animate-spin text-muted-foreground" />
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
												className="flex items-center justify-center"
												exit={{ scale: 0 }}>
												<CheckCircle2 className="h-6 w-6 mr-1 text-green-500" />
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
												className="flex items-center justify-center"
												exit={{ scale: 0 }}>
												<XCircle className="h-6 w-6 mr-1 text-red-500" />
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
