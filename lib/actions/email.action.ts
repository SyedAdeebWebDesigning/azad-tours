"use server";
import ReceiptEmail from "@/components/emails/ReceiptEmail";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReceiptEmail(email: string, orderId: string) {
	try {
		// Fetch booking details to populate the email
		const booking = await prisma.booking.findUnique({
			where: { orderId },
			include: { vehicle: true },
		});

		if (!booking) throw new Error("Booking not found");

		const { data, error } = await resend.emails.send({
			from: "Azad Logistics <onboarding@resend.dev>", // Use your verified domain in production
			to: [email],
			subject: `Booking Confirmed: #${orderId.slice(-6).toUpperCase()}`,
			react: ReceiptEmail({
				orderId: booking.orderId,
				from: booking.from,
				to: booking.to,
				amount: booking.amount,
				vehicleName: booking.vehicle.name,
			}),
		});

		if (error) {
			console.error("Resend Error:", error);
			return { success: false };
		}

		return { success: true, data };
	} catch (err) {
		console.error("Email Action Error:", err);
		return { success: false };
	}
}
