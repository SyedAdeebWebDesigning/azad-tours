"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createVehicle } from "@/lib/actions/vehicle.action";
import { Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function VehicleForm() {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const removeImage = () => {
		setPreviewUrl(null);
		setSelectedFile(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedFile) return toast.error("Please upload a vehicle image");

		setLoading(true);
		const formData = new FormData(e.currentTarget);

		const result = await createVehicle(formData);

		if (result.success) {
			toast.success("Vehicle added to Azad fleet");
			router.push("/dashboard/vehicles");
			router.refresh();
		} else {
			setLoading(false);
			toast.error(result.message || "Failed to save vehicle");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-10 max-w-5xl pb-20">
			{/* Visual Header / Image Upload */}
			<div className="space-y-3">
				<label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 ml-1">
					Fleet Portrait
				</label>
				<div
					onClick={() => !previewUrl && fileInputRef.current?.click()}
					className={`relative h-100 w-full rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${
						previewUrl
							? "border-neutral-200"
							: "border-neutral-200 hover:border-neutral-900 cursor-pointer bg-neutral-50/50"
					}`}>
					{previewUrl ? (
						<>
							<Image
								src={previewUrl}
								alt="Vehicle Preview"
								fill
								className="object-cover"
								priority
							/>
							<div className="absolute inset-0 bg-black/10 group hover:bg-black/20 transition-all" />
							<Button
								type="button"
								onClick={removeImage}
								className="absolute top-6 right-6 h-12 w-12 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:bg-red-500 hover:text-white transition-all text-neutral-900 border-none">
								<X size={20} />
							</Button>
						</>
					) : (
						<div className="flex flex-col items-center gap-4">
							<div className="h-20 w-20 bg-white rounded-3xl shadow-sm border border-neutral-100 flex items-center justify-center">
								<Plus className="text-neutral-400" size={32} />
							</div>
							<p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
								Drop vehicle image here
							</p>
						</div>
					)}
				</div>
				<Input
					type="file"
					name="image"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
					accept="image/*"
				/>
			</div>

			{/* Core Details Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						Brand / Manufacturer
					</label>
					<Input
						name="name"
						placeholder="e.g. Mercedes-Benz"
						required
						className="h-14 rounded-2xl bg-neutral-50 border-neutral-200 px-6 font-medium focus:bg-white"
					/>
				</div>
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						Model Version
					</label>
					<Input
						name="modelName"
						placeholder="e.g. V-Class Marco Polo"
						required
						className="h-14 rounded-2xl bg-neutral-50 border-neutral-200 px-6 font-medium focus:bg-white"
					/>
				</div>
			</div>

			{/* Specification Row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						Tier
					</label>
					<select
						name="category"
						className="w-full h-14 px-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-bold appearance-none outline-none focus:ring-2 ring-neutral-900 cursor-pointer">
						<option value="PREMIUM">Premium</option>
						<option value="BUDGET">Budget</option>
						<option value="XL_LUXURY">XL Luxury</option>
						<option value="VANS">Vans</option>
					</select>
				</div>
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						Seats
					</label>
					<Input
						name="maxPassengers"
						type="number"
						defaultValue={4}
						required
						className="h-14 rounded-2xl bg-neutral-50 border-neutral-200 px-6 font-bold"
					/>
				</div>
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						₹ / KM
					</label>
					<Input
						name="pricePerKm"
						type="number"
						step="0.1"
						placeholder="0.00"
						required
						className="h-14 rounded-2xl bg-neutral-50 border-neutral-200 px-6 font-bold"
					/>
				</div>
				<div className="space-y-3">
					<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
						Min Budget
					</label>
					<Input
						name="minBudget"
						type="number"
						placeholder="0.00"
						required
						className="h-14 rounded-2xl bg-neutral-50 border-neutral-200 px-6 font-bold"
					/>
				</div>
			</div>

			{/* Description Area */}
			<div className="space-y-3">
				<label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-2">
					Vehicle Features
				</label>
				<Textarea
					name="features"
					placeholder="List the vehicle's features for the production crew..."
					className="min-h-37.5 rounded-[2rem] bg-neutral-50 border-neutral-200 p-8 focus:bg-white transition-all resize-none text-sm leading-relaxed"
				/>
			</div>

			{/* Feature Flags */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
				<label className="flex items-center p-6 rounded-3xl bg-neutral-50 border border-neutral-100 cursor-pointer hover:bg-neutral-100 transition-colors gap-4">
					<input
						type="checkbox"
						name="isAdventure"
						className="w-5 h-5 rounded-md accent-black"
					/>
					<span className="text-xs font-black uppercase tracking-tight">
						Adventure Terrain Ready
					</span>
				</label>
				<label className="flex items-center p-6 rounded-3xl bg-neutral-50 border border-neutral-100 cursor-pointer hover:bg-neutral-100 transition-colors gap-4">
					<input
						type="checkbox"
						name="isAvailable"
						defaultChecked
						className="w-5 h-5 rounded-md accent-black"
					/>
					<span className="text-xs font-black uppercase tracking-tight">
						Active for Booking
					</span>
				</label>
			</div>

			{/* Footer Actions */}
			<div className="pt-10 border-t border-neutral-100 flex items-center justify-between">
				<Button
					type="button"
					variant="ghost"
					onClick={() => router.back()}
					className="font-black text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900">
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={loading}
					className="bg-neutral-900 text-white hover:bg-black px-16 h-16 rounded-2xl font-black text-sm shadow-2xl shadow-neutral-200 transition-all active:scale-95 disabled:opacity-70">
					{loading ? (
						<div className="flex items-center gap-3">
							<Loader2 className="animate-spin" size={18} />
							<span>PROCESSING FLEET UNIT...</span>
						</div>
					) : (
						"ADD VEHICLE"
					)}
				</Button>
			</div>
		</form>
	);
}
