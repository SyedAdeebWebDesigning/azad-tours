import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// lib/utils.ts

export async function getRoadDistance(
	from: string,
	to: string,
): Promise<number> {
	try {
		// 1. Helper function to turn "City Name" into {lat, lon} using Photon (Free)
		const geocode = async (cityName: string) => {
			const res = await fetch(
				`https://photon.komoot.io/api/?q=${encodeURIComponent(cityName)}&limit=1`,
			);
			const data = await res.json();
			if (!data.features?.length) return null;

			// Photon returns [longitude, latitude]
			const [lon, lat] = data.features[0].geometry.coordinates;
			return { lat, lon };
		};

		// 2. Geocode both points
		const start = await geocode(from);
		const end = await geocode(to);

		if (!start || !end) {
			console.error("Could not find coordinates for one of the cities.");
			return 0;
		}

		// 3. Fetch road distance from OSRM using coordinates
		const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`;
		const osrmRes = await fetch(osrmUrl);
		const osrmData = await osrmRes.json();

		if (osrmData.code !== "Ok" || !osrmData.routes?.length) {
			return 0;
		}

		// distance is in meters -> convert to KM
		return Math.round(osrmData.routes[0].distance / 1000);
	} catch (error) {
		console.error("Utility Error (getRoadDistance):", error);
		return 0;
	}
}

const geocode = async (cityName: string) => {
	// We force "India" into the search string here too
	const res = await fetch(
		`https://photon.komoot.io/api/?q=${encodeURIComponent(cityName + ", India")}&limit=1`,
	);
	const data = await res.json();

	// Final check: Is the result actually in India?
	const result = data.features?.[0];
	if (!result || result.properties.countrycode !== "IN") return null;

	const [lon, lat] = result.geometry.coordinates;
	return { lat, lon };
};
