import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
	// Fetch basic stats for the charts
	const totalVehicles = await prisma.vehicle.count();
	const availableVehicles = await prisma.vehicle.count({
		where: { isAvailable: true },
	});

	return (
		<section>
			<header className="mb-10">
				<h1 className="text-5xl font-black tracking-tighter text-neutral-900">
					Overview
				</h1>
				<p className="text-neutral-500 mt-2 font-medium">
					Real-time fleet and booking metrics.
				</p>
			</header>

			{/* --- CHART SECTION START --- */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
				{/* Chart 1: Booking Trends */}
				<div className="bg-white p-8 rounded-3xl border border-neutral-200 min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
					<div className="absolute top-6 left-8">
						<h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
							Monthly Bookings
						</h3>
						<p className="text-2xl font-bold text-neutral-900">
							Trend Analysis
						</p>
					</div>

					{/* PULL CHART DATA HERE: e.g., <BookingChart data={mongoData} /> */}
					<div className="text-neutral-300 font-mono text-sm border-2 border-dashed border-neutral-100 rounded-xl p-10">
						[Connect MongoDB Aggregation: Monthly Bookings Chart]
					</div>
				</div>

				{/* Chart 2: Revenue vs Category */}
				<div className="bg-white p-8 rounded-3xl border border-neutral-200 min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
					<div className="absolute top-6 left-8">
						<h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
							Revenue Split
						</h3>
						<p className="text-2xl font-bold text-neutral-900">
							By Vehicle Tier
						</p>
					</div>

					{/* PULL CHART DATA HERE: e.g., <RevenuePieChart data={mongoData} /> */}
					<div className="text-neutral-300 font-mono text-sm border-2 border-dashed border-neutral-100 rounded-xl p-10">
						[Connect MongoDB Aggregation: Revenue by Category Chart]
					</div>
				</div>
			</div>
			{/* --- CHART SECTION END --- */}

			{/* Simple Quick Stats */}
			<div className="grid grid-cols-3 gap-6">
				<div className="bg-neutral-900 p-8 rounded-3xl text-white">
					<p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
						Fleet Size
					</p>
					<p className="text-4xl font-black">{totalVehicles}</p>
				</div>

				<div className="bg-white p-8 rounded-3xl border border-neutral-200">
					<p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">
						In Service
					</p>
					<p className="text-4xl font-black text-neutral-900">
						{availableVehicles}
					</p>
				</div>

				<Link
					href="/dashboard/vehicles"
					className="group bg-white p-8 rounded-3xl border border-neutral-200 hover:border-neutral-900 transition-all">
					<p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">
						Manage
					</p>
					<p className="text-4xl font-black text-neutral-900 group-hover:translate-x-2 transition-transform">
						Fleet →
					</p>
				</Link>
			</div>
		</section>
	);
}
