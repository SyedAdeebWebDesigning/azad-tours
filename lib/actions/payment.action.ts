/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID!,
	key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(
	amount: number,
	vehicleId: string,
	from: string,
	to: string,
	distance: number,
	startDate: any,
	endDate: any,
	guests: number,
) {
	try {
		// 1. Authenticate the User
		const user = await currentUser();
		if (!user) throw new Error("Unauthorized");

		// 2. Create the Order in Razorpay
		const options = {
			amount: Math.round(amount * 100), // Convert INR to Paise
			currency: "INR",
			receipt: `receipt_${nanoid()}`,
		};

		const order = await razorpay.orders.create(options);

		// 3. Create the PENDING record in your Database
		// We use 'connect' for the vehicle relationship
		await prisma.booking.create({
			data: {
				startDate: startDate,
				endDate: endDate,
				guestCount: guests,
				userId: user.id,
				userEmail: user.primaryEmailAddress?.emailAddress || "",
				amount: amount,
				from: from,
				to: to,
				distance: distance,
				orderId: order.id, // Match with Razorpay Order ID
				status: "PENDING", // Important: Must start as PENDING
				vehicle: {
					connect: { id: vehicleId },
				},
				// paymentId is left empty; the Webhook will update it later
			},
		});

		return {
			success: true,
			orderId: order.id,
			amount: order.amount,
		};
	} catch (error: any) {
		console.error("Razorpay Order Error:", error);
		return { success: false, error: error.message };
	}
}
