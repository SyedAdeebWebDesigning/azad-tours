/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { VehicleCategory } from "@prisma/client";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function createVehicle(formData: FormData) {
	try {
		const imageFile = formData.get("image") as File;

		// 1. Validate File
		if (!imageFile || imageFile.size === 0) {
			return { success: false, message: "No image file provided" };
		}

		// 2. Upload to Vercel Blob (Server-Side)
		const blob = await put(
			`vehicles/${Date.now()}-${imageFile.name}`,
			imageFile,
			{
				access: "public",
			},
		);

		// 3. Create Record in MongoDB
		const vehicle = await prisma.vehicle.create({
			data: {
				name: formData.get("name") as string,
				modelName: formData.get("modelName") as string,
				category: formData.get("category") as VehicleCategory,
				maxPassengers: parseInt(formData.get("maxPassengers") as string) || 0,
				pricePerKm: parseFloat(formData.get("pricePerKm") as string) || 0,
				minBudget: parseFloat(formData.get("minBudget") as string) || 0,
				features: formData.get("features") as string,
				image: blob.url, // URL from Vercel
				isAdventure:
					formData.get("isAdventure") === "on" ||
					formData.get("isAdventure") === "true",
				isAvailable: true, // Default to available on create
			},
		});

		revalidatePath("/dashboard/vehicles");
		return { success: true, vehicle };
	} catch (error) {
		console.error("Creation Error:", error);
		return {
			success: false,
			message:
				error instanceof Error ? error.message : "Failed to create vehicle",
		};
	}
}

// Update vehicle details
export async function updateVehicle(id: string, formData: FormData) {
	try {
		// Check if a new image file was provided
		const imageFile = formData.get("image") as File;
		let imageUrl = formData.get("existingImage") as string;

		// Only upload to Vercel if a new file is actually selected
		if (imageFile && imageFile.size > 0) {
			// Optional: Delete the old blob if you have the URL to save space
			// if (imageUrl) await del(imageUrl);

			const blob = await put(
				`vehicles/${Date.now()}-${imageFile.name}`,
				imageFile,
				{
					access: "public",
				},
			);
			imageUrl = blob.url;
		}

		const data = {
			name: formData.get("name") as string,
			modelName: formData.get("modelName") as string,
			category: formData.get("category") as any,
			maxPassengers: parseInt(formData.get("maxPassengers") as string),
			pricePerKm: parseFloat(formData.get("pricePerKm") as string),
			minBudget: parseFloat(formData.get("minBudget") as string),
			features: formData.get("features") as string,
			image: imageUrl,
			isAdventure: formData.get("isAdventure") === "true",
			isAvailable: formData.get("isAvailable") === "true",
		};

		await prisma.vehicle.update({
			where: { id },
			data,
		});

		revalidatePath("/dashboard/vehicles");
		revalidatePath(`/dashboard/vehicles/${id}`);
		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Update failed",
		};
	}
}

// Quick toggle for availability
export async function toggleAvailability(id: string, currentStatus: boolean) {
	try {
		await prisma.vehicle.update({
			where: { id },
			data: { isAvailable: !currentStatus },
		});
		revalidatePath("/dashboard/vehicles");
		return { success: true };
	} catch (error) {
		console.error("Toggle failed:", error);
		return { success: false };
	}
}

// Delete a vehicle and its cloud image
export async function deleteVehicle(id: string) {
	try {
		// 1. Find the vehicle to get the image URL
		const vehicle = await prisma.vehicle.findUnique({
			where: { id },
			select: { image: true },
		});

		// 2. Delete the image from Vercel Blob to stay under quota
		if (vehicle?.image) {
			await del(vehicle.image);
		}

		// 3. Delete from MongoDB
		await prisma.vehicle.delete({
			where: { id },
		});

		revalidatePath("/dashboard/vehicles");
		return { success: true };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Delete failed",
		};
	}
}
