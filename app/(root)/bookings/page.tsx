import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Car, MoveRight } from "lucide-react";
import Link from "next/link";

export default async function BookingsPage() {
	const user = await currentUser();
	const bookings = await prisma.booking.findMany({
		where: { userId: user?.id },
		include: { vehicle: true },
		orderBy: { createdAt: "desc" },
	});

	if (bookings.length === 0) {
		return (
			<div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
				<div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
					<Car className="text-slate-400" size={32} />
				</div>
				<h2 className="text-3xl font-black uppercase italic tracking-tighter">
					No Active Missions
				</h2>
				<p className="text-slate-500 mt-2 max-w-xs">
					You {"haven't"} scheduled any fleet units yet. Start your journey
					today.
				</p>
				<Link href="/plan" className="mt-8">
					<Button className="  bg-primary text-white h-14 px-10 rounded-full font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">
						Initialize Plan
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<main className="max-w-6xl mx-auto py-24 px-6">
			<h1 className="text-5xl font-black uppercase italic tracking-tighter mb-12">
				Fleet History
			</h1>

			<div className="flex flex-col gap-4">
				{bookings.map((booking) => (
					<Link
						key={booking.id}
						href={`/bookings/${booking.id}`}
						className="block">
						<div className="group border-2 border-slate-100 hover:border-primary rounded-2xl p-6 transition-all bg-white hover:shadow-[8px_8px_0px_0px_rgba(75,138,255,1)]">
							<div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
								{/* 1. Route Section - Flex Grow to take available space */}
								<div className="flex items-center gap-4 flex-1 min-w-0">
									<div className="hidden sm:flex shrink-0 w-12 h-12 bg-slate-50 rounded-full items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
										<Car size={20} />
									</div>
									<div className="min-w-0">
										<p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
											Route Manifest
										</p>
										<div className="flex items-center gap-3 font-bold text-lg capitalize">
											<span className="truncate">{booking.from}</span>
											<ArrowRight
												size={16}
												className="text-slate-300 shrink-0"
											/>
											<span className="truncate text-zinc-500">
												{booking.to}
											</span>
										</div>
									</div>
								</div>

								{/* 2. Metadata Section - Fixed column widths for perfect alignment */}
								<div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 shrink-0">
									<div className="w-24 sm:w-32">
										<p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
											Fleet Unit
										</p>
										<p className="font-bold truncate uppercase text-sm">
											{booking.vehicle.name}
										</p>
									</div>

									<div className="w-24 sm:w-32">
										<p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
											Investment
										</p>
										<p className="font-bold italic text-lg">
											₹{booking.amount.toLocaleString()}
										</p>
									</div>

									<div className="hidden md:block w-24">
										<p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
											Status
										</p>
										<span className="inline-flex text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase border border-emerald-200">
											{booking.status}
										</span>
									</div>
								</div>

								{/* 3. Action Arrow */}
								<div className="hidden lg:block shrink-0">
									<div className="rounded-full w-10 h-10 flex items-center justify-center bg-slate-50 group-hover:bg-primary group-hover:text-white transition-colors">
										<MoveRight size={18} />
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
