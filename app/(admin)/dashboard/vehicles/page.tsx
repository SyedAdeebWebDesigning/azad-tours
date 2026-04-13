/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { toggleAvailability } from "@/lib/actions/vehicle.action";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function VehiclesPage() {
	const vehicles = await prisma.vehicle.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<section>
			<div className="flex justify-between items-end mb-10">
				<div>
					<h1 className="text-4xl font-black text-neutral-900">
						Fleet Inventory
					</h1>
					<p className="text-neutral-500 mt-2 text-lg">
						Managing {vehicles.length} units in MongoDB.
					</p>
				</div>
				<Link
					href="/dashboard/vehicles/new"
					className="bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg">
					+ Add Vehicle
				</Link>
			</div>

			<div className="space-y-4">
				{vehicles.map((car: any) => (
					<div
						key={car.id}
						className="bg-white p-7 rounded-2xl border border-neutral-200 flex items-center justify-between hover:border-neutral-400 transition-all">
						<div className="flex items-center gap-6">
							<div className="relative w-28 h-20 rounded-xl overflow-hidden ">
								{car.image ? (
									<Image
										src={car.image}
										alt={car.name}
										fill
										className="object-contain"
									/>
								) : (
									<div className="flex items-center justify-center h-full text-[10px] text-neutral-400">
										NO IMAGE
									</div>
								)}
							</div>
							<div>
								<h3 className="font-bold text-neutral-900 text-xl">
									{car.name}
								</h3>
								<div className="flex gap-3 text-sm text-neutral-500 font-medium">
									<span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
										{car.category}
									</span>
									<span>{car.maxPassengers} Pax</span>
									<span className="text-neutral-900 font-bold">
										₹{car.pricePerKm}/km
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<form
								action={
									toggleAvailability.bind(null, car.id, car.isAvailable) as any
								}>
								<Button
									className={`px-4 py-2 rounded-lg text-xs font-black transition-colors ${car.isAvailable ? "bg-neutral-900 text-white hover:bg-black" : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"}`}>
									{car.isAvailable ? "ACTIVE" : "OFF-DUTY"}
								</Button>
							</form>
							<Link
								href={`/dashboard/vehicles/${car.id}`}
								className="p-3 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-900">
								<span className="text-2xl font-light">→</span>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
