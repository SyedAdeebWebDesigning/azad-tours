import { getBookingByOrderId } from "@/lib/actions/booking.action";
import { Calendar, MoveLeft, ReceiptText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SingleBookingPage({
	params,
}: {
	params: Promise<{ orderId: string }>;
}) {
	const { orderId } = await params;
	const booking = await getBookingByOrderId(orderId);

	if (!booking) redirect("/bookings");

	return (
		<main className="min-h-screen bg-slate-50/50 py-20 px-6">
			<div className="max-w-4xl mx-auto">
				<Link
					href="/bookings"
					className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black mb-8 transition-colors">
					<MoveLeft size={16} /> Back to History
				</Link>

				<div className="bg-white border-2 border-black rounded-[2.5rem] overflow-hidden shadow-2xl">
					<div className="  bg-primary p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
						<div>
							<p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
								Logistics Manifest
							</p>
							<h2 className="text-2xl font-black italic tracking-tight uppercase">
								#{booking.orderId}
							</h2>
						</div>
						{/* <Button
							variant="outline"
							className="bg-transparent border-white/20 hover:bg-white/10 text-white rounded-xl">
							<Printer size={16} className="mr-2" /> Print Receipt
						</Button> */} 
					</div>

					<div className="p-8 md:p-12">
						{/* Status & Date */}
						<div className="flex flex-wrap gap-8 mb-12">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
									<ReceiptText size={20} />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase text-slate-400">
										Payment Status
									</p>
									<p className="font-bold uppercase text-sm">
										{booking.status}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
									<Calendar size={20} />
								</div>
								<div>
									<p className="text-[10px] font-black uppercase text-slate-400">
										Booking Date
									</p>
									<p className="font-bold text-sm">
										{new Date(booking.createdAt).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>

						<div className="grid md:grid-cols-2 gap-12">
							<div className="space-y-8">
								<div className="relative pl-8 border-l-2 border-dashed border-slate-200">
									<div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200" />
									<p className="text-[10px] font-black uppercase text-slate-400 mb-1">
										Pick up
									</p>
									<p className="text-xl font-bold">{booking.from}</p>
								</div>
								<div className="relative pl-8">
									<div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full   bg-primary" />
									<p className="text-[10px] font-black uppercase text-slate-400 mb-1">
										Drop off
									</p>
									<p className="text-xl font-bold">{booking.to}</p>
								</div>
							</div>

							<div className="  bg-primary text-white p-8 rounded-3xl flex flex-col justify-between">
								<div>
									<p className="text-[10px] font-black uppercase opacity-50 mb-1">
										Vehicle Details
									</p>
									<p className="text-2xl font-black italic tracking-tighter uppercase">
										{booking.vehicle.name}
									</p>
									<p className="text-xs opacity-70 mt-1">
										{booking.vehicle.modelName} | {booking.distance} KM Total
									</p>
								</div>
								<div className="mt-8 pt-6 border-t border-white/10">
									<p className="text-[10px] font-black uppercase opacity-50 mb-1">
										Total Fee Paid
									</p>
									<p className="text-4xl font-black tracking-tighter italic">
										₹{booking.amount.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
