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
) {
	try {
		const user = await currentUser();
		if (!user) throw new Error("Unauthorized");

		// 1. Create Order in Razorpay
		const options = {
			amount: Math.round(amount * 100),
			currency: "INR",
			receipt: `receipt_${nanoid()}`,
		};

		const order = await razorpay.orders.create(options);

		// 2. CREATE THE RECORD IN YOUR DB HERE
		// This is why the Webhook was failing – the record didn't exist yet!
		await prisma.booking.create({
			data: {
				userId: user.id,
				userEmail: user.primaryEmailAddress?.emailAddress || "",
				// Use connect if your schema defines a relation,
				// or just vehicleId if it's a plain string field
				vehicleId: vehicleId,
				amount: amount,
				from: from,
				to: to,
				orderId: order.id,
				status: "PENDING",
				// These are the "Missing Properties" Prisma was crying about:
				distance: null,
				paymentId: null,
			},
		});

		return {
			success: true,
			orderId: order.id,
			amount: order.amount,
		};
	} catch (error: any) {
		console.error("Order Creation Error:", error);
		return { success: false, error: error.message };
	}
}

/**
 * Optional: Manual Update Action
 * Used by the frontend 'handler' as a backup to the webhook
 */
export async function updateBookingToPaid(orderId: string, paymentId: string) {
	try {
		const updatedBooking = await prisma.booking.update({
			where: { orderId: orderId },
			data: {
				status: "PAID",
				paymentId: paymentId,
			},
		});

		return { success: true, booking: updatedBooking };
	} catch (error) {
		console.error("Manual Status Update Failed:", error);
		return { success: false };
	}
}
