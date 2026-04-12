import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Clock,
	Mail,
	MapPin,
	MessageSquare,
	Phone,
	SendHorizonal,
} from "lucide-react";

const ContactPage = () => {
	return (
		<main className="mt-32 px-4 pb-24">
			<div className="max-w-6xl mx-auto">
				<Heading
					title="Get in Touch"
					subTitle="Whether you're planning a cinematic masterpiece or a private getaway, our team is ready to assist you."
					theme="light"
				/>

				<div className="grid lg:grid-cols-12 gap-12 mt-16">
					{/* Left Side: Contact Information */}
					<div className="lg:col-span-5 space-y-8">
						<div>
							<h2 className="text-2xl font-bold mb-6">Contact Information</h2>
							<div className="space-y-6">
								<div className="flex gap-4 items-start">
									<div className="p-3 rounded-xl bg-primary/10 text-primary">
										<Phone size={20} />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Call Us</p>
										<p className="font-semibold text-lg">+91 078603 04246</p>
									</div>
								</div>

								<div className="flex gap-4 items-start">
									<div className="p-3 rounded-xl bg-primary/10 text-primary">
										<Mail size={20} />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Email Us</p>
										<p className="font-semibold text-lg">info@azadtours.in</p>
									</div>
								</div>

								<div className="flex gap-4 items-start">
									<div className="p-3 rounded-xl bg-primary/10 text-primary">
										<MapPin size={20} />
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Our Office</p>
										<p className="font-semibold leading-relaxed">
											Husainabad, Lucknow, Uttar Pradesh <br />
											India
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Business Hours Card */}
						<Card className="bg-muted/30 border-none shadow-none">
							<CardContent className="p-6 flex items-center gap-4">
								<Clock className="text-primary" size={24} />
								<div>
									<h4 className="font-bold">Operational Hours</h4>
									<p className="text-sm text-muted-foreground">
										Available 24 / 7 for Production Support
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Specialized Support Note */}
						<div className="p-6 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5">
							<div className="flex items-center gap-2 mb-2 text-primary">
								<MessageSquare size={18} />
								<span className="font-bold uppercase tracking-widest text-xs">
									Production Desk
								</span>
							</div>
							<p className="text-sm text-muted-foreground">
								Direct line for film production coordinators and luxury vanity
								van bookings.
							</p>
						</div>
					</div>

					{/* Right Side: Contact Form */}
					<div className="lg:col-span-7">
						<Card className="border shadow-2xl overflow-hidden">
							<div className="bg-primary h-2 w-full" />
							<CardContent className="p-8 md:p-12">
								<form className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-sm font-semibold">Full Name</label>
											<Input
												placeholder="John Doe"
												className="bg-muted/20 border-none h-12"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-semibold">
												Email Address
											</label>
											<Input
												placeholder="john@example.com"
												className="bg-muted/20 border-none h-12"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold">
											Inquiry Type
										</label>
										<select className="flex h-12 w-full rounded-md bg-muted/20 px-3 py-2 text-sm focus:outline-none border-none">
											<option>Film Production Logistics</option>
											<option>Luxury Vanity Van Rental</option>
											<option>Personalized Travel Tour</option>
											<option>Corporate Fleet Services</option>
											<option>Others</option>
										</select>
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold">Message</label>
										<Textarea
											placeholder="Tell us about your requirements..."
											className="bg-muted/20 border-none min-h-37.5 resize-none"
										/>
									</div>

									<Button className="w-full h-14 text-lg font-bold gap-2 group">
										Send Message
										<SendHorizonal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

export default ContactPage;
