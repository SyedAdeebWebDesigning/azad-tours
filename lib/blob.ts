import { put } from "@vercel/blob";

/**
 * Server-side upload utility
 * Only call this from "use server" files or API routes
 */
export const uploadToBlob = async (file: File, folder: string = "vehicles") => {
	try {
		// Generate a clean filename for the bucket
		const filename = `${folder}/${Date.now()}-${file.name.replaceAll(" ", "_")}`;

		const blob = await put(filename, file, {
			access: "public",
			addRandomSuffix: true, // Prevents overwriting files with the same name
		});

		return blob.url;
	} catch (error) {
		console.error("Vercel Blob Setup Error:", error);
		throw new Error("Failed to upload to cloud storage.");
	}
};
