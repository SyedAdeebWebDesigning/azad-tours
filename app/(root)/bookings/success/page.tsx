// app/bookings/success/page.tsx

import { getBookingByOrderId } from "@/lib/actions/booking.action";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import { redirect } from "next/navigation";

// Notice the type definition for searchParams uses Promise
export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ orderId?: string }>;
}) {
	// 1. You MUST await searchParams before using it
	const params = await searchParams;
	const id = params.orderId;

	// 2. Check if ID exists before calling the server action
	if (!id) {
		console.error("Success Page: No orderId found in URL");
		redirect("/");
	}

	// 3. Now the ID is definitely a string
	const booking = await getBookingByOrderId(id);

	if (!booking) {
		console.error("Success Page: Booking not found in Database for ID:", id);
		redirect("/");
	}

	return (
		<div className="min-h-screen bg-white mt-32 px-6">
			<div className="max-w-4xl mx-auto">
				{/* Status Header */}
				<div className="flex flex-col items-center text-center mb-16">
					<div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
						<Check size={32} strokeWidth={3} />
					</div>
					<h1 className="text-5xl font-black uppercase italic tracking-tighter">
						Booking Secured
					</h1>
					<p className="text-slate-500 font-medium mt-2">
						Order <span className="text-black">#{booking.orderId}</span> has
						been processed.
					</p>
				</div>

				{/* The "Logistics Manifest" Card */}
				<div className="grid md:grid-cols-3 border-2 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
					{/* Left Section: Route & Travel */}
					<div className="md:col-span-2 p-10 border-r-2 border-black">
						<div className="flex items-center gap-2 mb-8">
							<Package size={18} />
							<span className="text-xs font-black uppercase tracking-widest">
								Route Manifest
							</span>
						</div>

						<div className="space-y-12 relative">
							{/* Vertical Line for Route */}
							<div className="absolute left-2.75 top-3 bottom-3 w-0.5 bg-slate-200" />

							<div className="relative pl-10">
								<div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-black bg-white" />
								<p className="text-xs font-bold text-slate-400 uppercase">
									Origin
								</p>
								<p className="text-2xl font-black">{booking.from}</p>
							</div>

							<div className="relative pl-10">
								<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-black flex items-center justify-center">
									<MapPin size={12} className="text-white" />
								</div>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Destination
								</p>
								<p className="text-2xl font-black">{booking.to}</p>
							</div>
						</div>

						<div className="mt-12 pt-10 border-t-2 border-slate-100 grid grid-cols-2 gap-6">
							<div>
								<p className="text-[10px] font-black uppercase text-slate-400 mb-1">
									Assigned Vehicle
								</p>
								<p className="font-bold text-lg">{booking.vehicle.name}</p>
							</div>
							<div>
								<p className="text-[10px] font-black uppercase text-slate-400 mb-1">
									Total Distance
								</p>
								<p className="font-bold text-lg">{booking.distance} KM</p>
							</div>
						</div>
					</div>

					{/* Right Section: Payment & User */}
					<div className="bg-slate-50 p-10 flex flex-col justify-between">
						<div>
							<div className="flex items-center gap-2 mb-8">
								<CreditCard size={18} />
								<span className="text-xs font-black uppercase tracking-widest">
									Financials
								</span>
							</div>

							<div className="mb-8">
								<p className="text-[10px] font-black uppercase text-slate-400">
									Paid Amount
								</p>
								<p className="text-4xl font-black italic">
									₹{booking.amount.toLocaleString()}
								</p>
							</div>

							<div className="space-y-4">
								<div>
									<p className="text-[10px] font-black uppercase text-slate-400">
										User
									</p>
									<p className="font-bold text-sm truncate">
										{booking.userEmail}
									</p>
								</div>
								<div>
									<p className="text-[10px] font-black uppercase text-slate-400">
										Method
									</p>
									<p className="font-bold text-sm">Razorpay Secured</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="text-center mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest">
					Thank you for choosing Azad Tours and Travels Logistics.
				</p>
			</div>
		</div>
	);
}
