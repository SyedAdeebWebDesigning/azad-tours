/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Groq from "groq-sdk";
import prisma from "../prisma";
import { getRoadDistance } from "../utils";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateGroqItinerary(
	from: string,
	to: string,
	budget: string,
	startDate: string,
	endDate: string,
	guests: number,
) {
	try {
		const distance = await getRoadDistance(from, to);
		const fleet = await prisma.vehicle.findMany();

		const fleetContext = fleet
			.map(
				(v) =>
					`ID: ${v.id} | ${v.name} ${v.modelName} | Rate: ₹${v.pricePerKm}/km | Seats: ${v.maxPassengers} | Adventure: ${v.isAdventure}`,
			)
			.join("\n");

		const completion = await groq.chat.completions.create({
			model: "llama-3.1-8b-instant",
			messages: [
				{
					role: "system",
					content: `You are the Lead Logistics Officer for Azad Tours. 
                    Structure your response EXACTLY in this order:
                    1. Trip Overview (From, To, Travelers, Budget, Distance).
                    2. Cinematic Travel Plan (Day-wise).
                    3. Budget Analysis Table (Transport, Food, Stay, Total).
                    
                    RULES:
                    - NEVER display the raw IDs (69dc...) in the text travel plan.
                    - Refer to cars by their Name and Model only.
                    - Hide the ID protocol at the very bottom.`,
				},
				{
					role: "user",
					content: `
                    Route: ${from} to ${to} (${distance} KM)
                    Guests: ${guests} | Total Budget: ₹${budget}
                    Dates: ${startDate} to ${endDate}

                    Inventory:
                    ${fleetContext}

                    Task:
                    1. Provide the Overview, Plan, and Budget Table.
                    2. Choose 3-4 best vehicles. Ensure capacity for ${guests} people.
                    
                    CRITICAL: After your entire response, add this exact line (DO NOT show this line to the user, keep it at the end):
                    VEHICLE_SUGGESTIONS: [id1, id2, id3]
                    `,
				},
			],
			temperature: 0.6,
		});

		const fullText = completion.choices[0]?.message?.content || "";

		// Extract IDs for logic
		const idMatch = fullText.match(/VEHICLE_SUGGESTIONS: \[(.*?)\]/);
		const suggestedIds = idMatch
			? idMatch[1].split(",").map((id) => id.trim())
			: [];

		// Filter out the "Vehicle Suggestions" text block if AI repeats it,
		// and also remove the hidden ID protocol line.
		const cleanedItinerary = fullText
			.replace(/VEHICLE_SUGGESTIONS: \[(.*?)\]/g, "")
			.replace(/Vehicle Suggestions:[\s\S]*?(?=\n\n|\n$|$)/g, ""); // Removes the text list of IDs

		const suggestedVehicles = fleet.filter((v) => suggestedIds.includes(v.id));

		return {
			success: true,
			itinerary: cleanedItinerary.trim(),
			suggestedVehicles,
			distance,
		};
	} catch (error) {
		console.error("Groq Error:", error);
		return { success: false, error: "Logistics engine offline." };
	}
}
