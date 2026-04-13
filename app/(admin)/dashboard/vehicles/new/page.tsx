import VehicleForm from "@/components/admin/VehicleForm";

export default function NewVehiclePage() {
	return (
		<section className="max-w-3xl">
			<header className="mb-10">
				<h1 className="text-4xl font-black text-neutral-900 tracking-tighter">
					REGISTER NEW UNIT
				</h1>
				<p className="text-neutral-500 mt-2 font-medium text-lg">
					Add a new vehicle to the fleet inventory.
				</p>
			</header>

			<div className="bg-white rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/40 overflow-hidden">
				<div className="p-1 bg-neutral-900" /> {/* Top accent bar */}
				<div className="p-8">
					<VehicleForm />
				</div>
			</div>
		</section>
	);
}
