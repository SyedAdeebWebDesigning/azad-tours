/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Heading from "@/components/shared/Heading";
import ItineraryRenderer from "@/components/shared/ItineraryReader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateGroqItinerary } from "@/lib/actions/aiPlanner";
import { createRazorpayOrder } from "@/lib/actions/payment.action";
import { useUser } from "@clerk/nextjs"; // Added Clerk hook
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	CheckCircle2,
	IndianRupee,
	Loader2,
	MapPin,
	Sparkles,
	Users,
	Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Corrected router import for Next.js 13+
import Script from "next/script"; // Added Script for Razorpay
import { useEffect, useState, useTransition } from "react";

// --- Sub-component: City Autocomplete (unchanged) ---
const PhotonAutocomplete = ({
	placeholder,
	onSelect,
	defaultValue,
}: {
	placeholder: string;
	onSelect: (val: string) => void;
	defaultValue: string;
}) => {
	const [query, setQuery] = useState(defaultValue);
	const [results, setResults] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			if (query.length < 3 || !isOpen) return;
			try {
				const res = await fetch(
					`https://photon.komoot.io/api/?q=${encodeURIComponent(query + " India")}&limit=10&osm_tag=place:city&osm_tag=place:town`,
				);
				const data = await res.json();
				const indianResults = data.features.filter(
					(r: any) =>
						r.properties.countrycode === "IN" ||
						r.properties.country === "India",
				);
				setResults(indianResults.slice(0, 5));
			} catch (err) {
				console.error("Photon Error:", err);
			}
		};

		const timer = setTimeout(fetchCities, 400);
		return () => clearTimeout(timer);
	}, [query, isOpen]);

	return (
		<div className="relative w-full">
			<Input
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setIsOpen(true);
				}}
				placeholder={placeholder}
				className="h-14 rounded-xl bg-muted/20 border-none"
			/>
			<AnimatePresence>
				{isOpen && results.length > 0 && (
					<motion.ul
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="absolute z-50 w-full mt-2 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-2xl max-h-60 overflow-auto overflow-x-hidden">
						{results.map((r, i) => (
							<li
								key={i}
								className="px-4 py-3 hover:bg-primary/10 cursor-pointer text-sm border-b border-border/50 last:border-none transition-colors"
								onClick={() => {
									const cityName = `${r.properties.name}${r.properties.state ? `, ${r.properties.state}` : ""}`;
									setQuery(cityName);
									onSelect(cityName);
									setIsOpen(false);
								}}>
								<div className="font-semibold text-foreground">
									{r.properties.name}
								</div>
								<div className="text-[10px] text-muted-foreground uppercase tracking-wider">
									{r.properties.state || r.properties.country}
								</div>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

// --- Main TripPlanner Component ---
const TripPlanner = () => {
	const { user } = useUser(); // Hook for pre-filling payment details
	const router = useRouter(); // Correct router
	const [step, setStep] = useState(1);
	const [itinerary, setItinerary] = useState("");
	const [suggestedVehicles, setSuggestedVehicles] = useState<any[]>([]);
	const [tripDistance, setTripDistance] = useState(0);
	const [isPending, startTransition] = useTransition();
	const [isBooking, setIsBooking] = useState(false); // Handle button loading state
	const today = new Date().toISOString().split("T")[0];

	const [formData, setFormData] = useState({
		from: "",
		to: "",
		budget: "",
		startDate: "",
		endDate: "",
		guests: 1,
	});

	const formatCurrency = (val: string) => {
		const num = val.replace(/[^0-9]/g, "");
		return num ? new Intl.NumberFormat("en-IN").format(parseInt(num)) : "";
	};

	const formatDateForAI = (date: string) => {
		if (!date) return "";
		const [y, m, d] = date.split("-");
		return `${d}/${m}/${y}`;
	};

	// --- UPDATED: handleBooking to receive vehicle object ---
	const handleBooking = async (vehicle: any) => {
		setIsBooking(true);
		try {
			const totalAmount = Math.round(vehicle.pricePerKm * tripDistance);

			// 1. Call Server Action to create Razorpay Order and DB record
			const orderData = await createRazorpayOrder(
				totalAmount,
				vehicle.id,
				formData.from,
				formData.to,
				tripDistance,
			);

			if (!orderData.success) {
				alert("Failed to initialize booking. Please try again.");
				setIsBooking(false);
				return;
			}

			// 2. Configure the Razorpay Checkout Modal
			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: orderData.amount,
				currency: "INR",
				name: "Azad Logistics",
				description: `Fleet Booking: ${formData.from} to ${formData.to}`,
				order_id: orderData.orderId,
				handler: async function (response: any) {
					// Success callback
					router.push(`/bookings/success?orderId=${orderData.orderId}`);
				},
				prefill: {
					name: user?.fullName || "",
					email: user?.primaryEmailAddress?.emailAddress || "",
				},
				modal: {
					ondismiss: () => setIsBooking(false),
				},
				theme: {
					color: "#000000",
				},
			};

			const rzp = new (window as any).Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Payment Step Failed:", error);
			setIsBooking(false);
		}
	};

	const handlePlanTrip = () => {
		if (
			!formData.from.toLowerCase().includes("india") &&
			!formData.from.includes(",")
		) {
			alert("Please select a valid city in India from the suggestions.");
			return;
		}

		startTransition(async () => {
			const result = await generateGroqItinerary(
				formData.from,
				formData.to,
				formData.budget,
				formatDateForAI(formData.startDate),
				formatDateForAI(formData.endDate),
				formData.guests,
			);

			if (result.success) {
				setItinerary(result.itinerary || "No itinerary generated.");
				setSuggestedVehicles(result.suggestedVehicles || []);
				setTripDistance(result.distance || 0);
				setStep(3);
			}
		});
	};

	const isStep1Complete =
		formData.from && formData.to && formData.startDate && formData.endDate;

	return (
		<>
			{/* Razorpay Script Loading */}
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />

			<main className="mt-32 px-4 pb-24 min-h-[70vh]">
				<div className="max-w-4xl mx-auto">
					<Heading
						title="AI Trip Planner"
						subTitle="Tell us your vision, and Azad will craft the perfect journey."
						theme="light"
					/>

					<div className="mt-12">
						<Card className="border shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-xl">
							<CardContent className="p-8 md:p-12">
								<AnimatePresence mode="wait">
									{step === 1 && (
										<motion.div
											key="s1"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="space-y-6">
											<div className="bg-indigo-500/10 w-fit p-4 rounded-2xl text-indigo-600">
												<MapPin size={32} />
											</div>
											<h2 className="text-2xl font-bold">Where & When?</h2>
											<div className="grid sm:grid-cols-2 gap-4">
												<div className="space-y-1">
													<label className="text-[10px] font-bold uppercase ml-1 text-muted-foreground">
														Starting City
													</label>
													<PhotonAutocomplete
														placeholder="e.g. Lucknow"
														defaultValue={formData.from}
														onSelect={(val) =>
															setFormData({ ...formData, from: val })
														}
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[10px] font-bold uppercase ml-1 text-muted-foreground">
														Destination
													</label>
													<PhotonAutocomplete
														placeholder="e.g. Varanasi"
														defaultValue={formData.to}
														onSelect={(val) =>
															setFormData({ ...formData, to: val })
														}
													/>
												</div>
											</div>
											<div className="grid sm:grid-cols-3 gap-4 items-start">
												<div className="relative">
													<Input
														type="number"
														min="1"
														className="h-14 pl-12 rounded-xl"
														value={formData.guests}
														onChange={(e) =>
															setFormData({
																...formData,
																guests: parseInt(e.target.value) || 1,
															})
														}
													/>
													<Users
														className="absolute left-4 top-4 text-muted-foreground"
														size={20}
													/>
												</div>
												<div className="relative">
													<Input
														type="date"
														min={today}
														className="h-14 pl-12 rounded-xl"
														value={formData.startDate}
														onChange={(e) =>
															setFormData({
																...formData,
																startDate: e.target.value,
															})
														}
													/>
													<Calendar
														className="absolute left-4 top-4 text-muted-foreground"
														size={20}
													/>
												</div>
												<div className="relative">
													<Input
														type="date"
														min={formData.startDate || today}
														className="h-14 pl-12 rounded-xl"
														value={formData.endDate}
														onChange={(e) =>
															setFormData({
																...formData,
																endDate: e.target.value,
															})
														}
													/>
													<Calendar
														className="absolute left-4 top-4 text-muted-foreground"
														size={20}
													/>
												</div>
											</div>
											<Button
												onClick={() => setStep(2)}
												disabled={!isStep1Complete}
												className="w-full h-14 rounded-xl text-lg">
												Next Step <ArrowRight className="ml-2" />
											</Button>
										</motion.div>
									)}

									{step === 2 && (
										<motion.div
											key="s2"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="space-y-6">
											<div className="bg-emerald-500/10 w-fit p-4 rounded-2xl text-emerald-600">
												<IndianRupee size={32} />
											</div>
											<h2 className="text-2xl font-bold">Set your budget</h2>
											<div className="relative">
												<span className="absolute left-4 top-4 text-2xl font-mono">
													₹
												</span>
												<Input
													className="h-16 pl-10 text-2xl font-mono rounded-xl"
													placeholder="10,000"
													value={formatCurrency(formData.budget)}
													onChange={(e) =>
														setFormData({
															...formData,
															budget: e.target.value.replace(/[^0-9]/g, ""),
														})
													}
												/>
											</div>
											<div className="flex gap-4">
												<Button
													variant="outline"
													onClick={() => setStep(1)}
													className="h-14 px-6 rounded-xl">
													<ArrowLeft />
												</Button>
												<Button
													onClick={handlePlanTrip}
													disabled={!formData.budget || isPending}
													className="flex-1 h-14 rounded-xl text-lg bg-emerald-600 hover:bg-emerald-700">
													{isPending ? (
														<Loader2 className="animate-spin" />
													) : (
														"Generate AI Plan"
													)}
												</Button>
											</div>
										</motion.div>
									)}

									{step === 3 && (
										<motion.div
											key="s3"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
											<div className="text-center relative py-6">
												<div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
												<div className="bg-primary/10 w-fit p-4 rounded-full text-primary mx-auto mb-4 border border-primary/20">
													<Sparkles size={32} />
												</div>
												<h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">
													Your Azad Master Plan
												</h2>
												<p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
													Review your logistics protocol and select your
													preferred fleet unit below.
												</p>
											</div>

											<div className="bg-background/95 p-10 md:p-14 rounded-[3.5rem] border border-border shadow-inner">
												<div className="prose prose-neutral max-w-none">
													<ItineraryRenderer
														content={itinerary.split("VEHICLE_SUGGESTIONS:")[0]}
													/>
												</div>
											</div>

											{suggestedVehicles.length > 0 && (
												<div className="pt-16 border-t border-border mt-16">
													<div className="flex items-center justify-between mb-10 pb-4 border-b border-border/50">
														<div className="flex flex-col">
															<p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
																Logistics Strategy
															</p>
															<h3 className="text-3xl font-black uppercase tracking-tighter">
																Recommended Fleet Units
															</h3>
														</div>
														<div className="text-xs font-medium text-muted-foreground px-4 py-2 bg-muted/30 rounded-full flex items-center gap-2">
															<Zap className="w-3.5 h-3.5 text-emerald-500" />
															{tripDistance} km trip distance.
														</div>
													</div>

													<div className="space-y-8">
														{suggestedVehicles.map((vehicle) => (
															<div
																key={vehicle.id}
																className="group relative flex flex-col md:flex-row bg-background/50 rounded-[3rem] border border-border overflow-hidden hover:shadow transition-all duration-500 hover:border-primary/40 hover:-translate-y-2">
																<div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden bg-muted/10 p-4">
																	<div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
																		<Image
																			src={vehicle.image}
																			alt={vehicle.name}
																			fill
																			className="object-contain transition-transform duration-700 group-hover:scale-105"
																		/>
																	</div>

																	{vehicle.isAdventure && (
																		<div className="absolute top-6 left-6 bg-black text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-md backdrop-blur-sm">
																			<MapPin className="w-3 h-3 text-emerald-400" />
																			Adventure Ready
																		</div>
																	)}
																</div>

																<div className="p-10 flex flex-col flex-1">
																	<div className="mb-8 pb-6 border-b border-border/50 flex items-start justify-between gap-4">
																		<div>
																			<h4 className="text-3xl font-black text-foreground uppercase tracking-tight leading-none">
																				{vehicle.name}
																			</h4>
																			<p className="text-base font-medium text-muted-foreground mt-2 italic">
																				{vehicle.modelName}
																			</p>
																		</div>
																		<div className="shrink-0 text-right">
																			<p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1.5">
																				Base Rate
																			</p>
																			<div className="flex items-center gap-2 justify-end">
																				<IndianRupee className="w-5 h-5 text-emerald-600" />
																				<p className="text-xl font-bold text-foreground">
																					₹{vehicle.pricePerKm}/km
																				</p>
																			</div>
																		</div>
																	</div>

																	<div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
																		<div className="flex items-center gap-3">
																			<Users className="w-4 h-4 text-primary mt-0.5" />
																			<p className="text-xs font-bold text-foreground/90 uppercase tracking-tight">
																				Seats {vehicle.maxPassengers}
																			</p>
																		</div>
																		<div className="flex items-center gap-3">
																			<CheckCircle2 className="w-4 h-4 text-emerald-600" />
																			<p className="text-xs text-muted-foreground italic font-medium">
																				Verified Azad Unit
																			</p>
																		</div>
																	</div>

																	<div className="mt-auto pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
																		<div className="p-4 bg-muted/40 rounded-2xl flex flex-col">
																			<span className="block text-[9px] font-black uppercase text-muted-foreground tracking-widest">
																				Est. Transport Cost
																			</span>
																			<p className="text-3xl font-black text-primary tracking-tighter">
																				₹
																				{Math.round(
																					vehicle.pricePerKm * tripDistance,
																				).toLocaleString("en-IN")}
																			</p>
																		</div>
																		<Button
																			disabled={isBooking}
																			onClick={() => handleBooking(vehicle)}
																			className="w-full md:w-auto bg-black text-white text-[11px] h-14 px-10 rounded-full font-black uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-neutral-300">
																			{isBooking ? (
																				<Loader2 className="animate-spin" />
																			) : (
																				"Book Now"
																			)}
																		</Button>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											)}

											<Button
												onClick={() => setStep(1)}
												variant="outline"
												className="w-full h-14 rounded-2xl border-2 font-black uppercase text-xs tracking-[0.2em] hover:bg-muted">
												Start New Master Plan
											</Button>
										</motion.div>
									)}
								</AnimatePresence>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</>
	);
};

export default TripPlanner;
