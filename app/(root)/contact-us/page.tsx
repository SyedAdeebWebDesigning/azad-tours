"use client";

import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/actions/sendEmail";
import {
	Clock,
	Loader2,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	SendHorizonal,
} from "lucide-react";
import React, { useRef, useTransition } from "react";
import { toast } from "sonner"; // Ensure <Toaster /> is in your root layout

const ContactPage = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			const result = await sendEmail(formData);
			if (result?.success) {
				toast.success("Message sent! We'll get back to you shortly.");
				formRef.current?.reset();
			} else {
				toast.error(result?.error || "Failed to send message.");
			}
		});
	};

	return (
		<main className="mt-32 px-4 pb-24">
			<div className="max-w-6xl mx-auto">
				<Heading
					title="Get in Touch"
					subTitle="From high-stakes film productions to serene getaways, our team is ready to support your journey."
					theme="light"
				/>

				<div className="grid lg:grid-cols-12 gap-12 mt-16">
					{/* Left Side: Contact Information */}
					<div className="lg:col-span-5 space-y-8">
						<div>
							<h2 className="text-2xl font-bold mb-6 tracking-tight">
								Contact Information
							</h2>
							<div className="space-y-6">
								<ContactDetail
									icon={<Phone size={20} />}
									label="Call Us"
									value="+91 78603 04246"
								/>
								<ContactDetail
									icon={<Mail size={20} />}
									label="Email Us"
									value="info@azadtours.in"
								/>
								<ContactDetail
									icon={<MapPin size={20} />}
									label="Our Office"
									value={<>Husainabad, Lucknow, Uttar Pradesh</>}
								/>
							</div>
						</div>

						<Card className="bg-muted/30 border-none shadow-none rounded-2xl">
							<CardContent className="p-6 flex items-center gap-4">
								<div className="bg-background p-2 rounded-full shadow-sm">
									<Clock className="text-primary" size={24} />
								</div>
								<div>
									<h4 className="font-bold">Operational Hours</h4>
									<p className="text-sm text-muted-foreground">
										Available 24 / 7 for Production Support
									</p>
								</div>
							</CardContent>
						</Card>

						<div className="p-6 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5">
							<div className="flex items-center gap-2 mb-2 text-primary">
								<MessageSquare size={18} />
								<span className="font-bold uppercase tracking-widest text-[10px]">
									Production Desk
								</span>
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Direct line for film production coordinators and luxury vanity
								van bookings.
							</p>
						</div>
					</div>

					{/* Right Side: Professional Contact Form */}
					<div className="lg:col-span-7">
						<Card className="border shadow-2xl overflow-hidden rounded-3xl">
							<div className="bg-primary h-2 w-full" />
							<CardContent className="p-8 md:p-12 bg-card">
								<form ref={formRef} action={handleSubmit} className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-sm font-semibold ml-1">
												Full Name
											</label>
											<Input
												name="fullname"
												required
												placeholder="John Doe"
												className="bg-muted/40 border-none h-12 focus-visible:ring-primary/30"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-semibold ml-1">
												Email Address
											</label>
											<Input
												name="email"
												type="email"
												required
												placeholder="john@example.com"
												className="bg-muted/40 border-none h-12 focus-visible:ring-primary/30"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold ml-1">
											Inquiry Type
										</label>
										<select
											name="type"
											required
											className="flex h-12 w-full rounded-md bg-muted/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 border-none appearance-none cursor-pointer">
											<option value="Film Production Logistics">
												Film Production Logistics
											</option>
											<option value="Luxury Vanity Van Rental">
												Luxury Vanity Van Rental
											</option>
											<option value="Personalized Travel Tour">
												Personalized Travel Tour
											</option>
											<option value="Corporate Fleet Services">
												Corporate Fleet Services
											</option>
											<option value="Others">Others</option>
										</select>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold ml-1">
											Message
										</label>
										<Textarea
											name="message"
											required
											placeholder="How can we help you?"
											className="bg-muted/40 border-none min-h-[160px] resize-none focus-visible:ring-primary/30 px-4 py-3"
										/>
									</div>

									<Button
										type="submit"
										disabled={isPending}
										className="w-full h-14 text-lg font-bold gap-3 group transition-all">
										{isPending ? (
											<>
												<Loader2 className="w-5 h-5 animate-spin" />
												Sending...
											</>
										) : (
											<>
												Send Message
												<SendHorizonal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
											</>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</main>
	);
};

// Helper component for cleaner code
const ContactDetail = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
}) => (
	<div className="flex gap-5 items-start">
		<div className="p-3.5 rounded-2xl bg-primary/10 text-primary shadow-sm">
			{icon}
		</div>
		<div>
			<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">
				{label}
			</p>
			<p className="font-bold text-lg text-foreground/90">{value}</p>
		</div>
	</div>
);

export default ContactPage;
