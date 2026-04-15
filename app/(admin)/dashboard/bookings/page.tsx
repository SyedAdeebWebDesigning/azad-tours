import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Clock, ExternalLink, Filter, Search } from "lucide-react";
import Link from "next/link";

export default async function DashboardBookingsPage() {
	const user = await currentUser();

	const bookings = await prisma.booking.findMany({
		where: { userId: user?.id },
		include: { vehicle: true },
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className="p-4 md:p-8 max-w-7xl mx-auto">
			{/* Header Area */}
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
				<div>
					<h1 className="text-4xl font-black uppercase tracking-tighter italic">
						Booking Registry
					</h1>
					<p className="text-slate-500 text-sm font-medium mt-1">
						Manage and track your active fleet deployments.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<div className="relative group">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Search Manifest ID..."
							className="pl-10 pr-4 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm focus:border-black outline-none transition-all w-full md:w-64"
						/>
					</div>
					<Button
						variant="outline"
						className="rounded-xl border-2 border-slate-100 h-10">
						<Filter size={16} className="mr-2" /> Filter
					</Button>
				</div>
			</div>

			{/* Manifest Table */}
			<div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-slate-50/50 border-b-2 border-slate-100">
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
									Dispatch ID
								</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
									Route Details
								</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
									Fleet Unit
								</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
									Investment
								</th>
								<th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
									Status
								</th>
								<th className="px-6 py-5 text-right"></th>
							</tr>
						</thead>
						<tbody className="divide-y-2 divide-slate-50">
							{bookings.map((booking) => (
								<tr
									key={booking.id}
									className="hover:bg-slate-50/30 transition-colors group">
									<td className="px-6 py-6">
										<p className="font-mono text-xs font-bold text-slate-400 group-hover:text-black transition-colors">
											#{booking.orderId.slice(-8).toUpperCase()}
										</p>
										<p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">
											{new Date(booking.createdAt).toLocaleDateString()}
										</p>
									</td>
									<td className="px-6 py-6">
										<div className="flex items-center gap-3">
											<div className="min-w-0">
												<p className="font-black text-sm uppercase truncate max-w-[120px]">
													{booking.from}
												</p>
												<div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
													<ArrowRight size={10} /> {booking.to}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-6">
										<div className="flex items-center gap-2">
											<span className="p-1.5 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-black group-hover:text-white transition-colors">
												<Clock size={14} />
											</span>
											<p className="text-xs font-black uppercase tracking-tight italic">
												{booking.vehicle.name}
											</p>
										</div>
									</td>
									<td className="px-6 py-6 font-black italic text-sm">
										₹{booking.amount.toLocaleString()}
									</td>
									<td className="px-6 py-6">
										<span
											className={`text-[9px] px-2 py-1 rounded-full font-black uppercase border ${
												booking.status === "CONFIRMED"
													? "bg-emerald-50 text-emerald-600 border-emerald-100"
													: "bg-amber-50 text-amber-600 border-amber-100"
											}`}>
											{booking.status}
										</span>
									</td>
									<td className="px-6 py-6 text-right">
										<Link href={`/bookings/${booking.orderId}`}>
											<Button
												variant="ghost"
												size="sm"
												className="rounded-lg h-8 px-3 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
												View <ExternalLink size={12} className="ml-1.5" />
											</Button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{bookings.length === 0 && (
					<div className="py-20 text-center">
						<p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
							Zero Active Deployments
						</p>
						<Link href="/plan">
							<Button
								variant="link"
								className="text-black font-bold uppercase text-xs mt-2 underline-offset-4">
								Initialize Plan Now
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
