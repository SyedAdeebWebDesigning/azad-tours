/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendReceiptEmail } from "@/lib/actions/email.action";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * AZAD LOGISTICS: RAZORPAY WEBHOOK HANDLER
 * This route is the safety net for all payments.
 */

export async function POST(req: NextRequest) {
	try {
		// 1. Get the raw body (Required for signature verification)
		const body = await req.text();

		// 2. Get the signature from headers
		const signature = req.headers.get("x-razorpay-signature");
		const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

		if (!signature || !webhookSecret) {
			console.error("Missing signature or secret");
			return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
		}

		// 3. Verify the signature
		const expectedSignature = crypto
			.createHmac("sha256", webhookSecret)
			.update(body)
			.digest("hex");

		if (expectedSignature !== signature) {
			console.error("Invalid Webhook Signature");
			return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
		}

		// 4. Parse the validated data
		const payload = JSON.parse(body);
		const event = payload.event;

		console.log(`[RAZORPAY WEBHOOK] Event Received: ${event}`);

		// 5. Handle the 'order.paid' event (The Gold Standard)
		if (event === "order.paid") {
			const orderEntity = payload.payload.order.entity;
			const paymentEntity = payload.payload.payment.entity;

			const orderId = orderEntity.id;
			const paymentId = paymentEntity.id;
			const email = paymentEntity.email;

			// 6. Update Database
			// We use updateMany in case the record is still being created by the frontend
			await prisma.booking.update({
				where: { orderId: orderId },
				data: {
					status: "PAID",
					paymentId: paymentId,
					userEmail: email, // Double-check we have the payment email
				},
			});

			console.log(`[SUCCESS] Booking for Order ${orderId} marked as PAID.`);

			// --- OPTIONAL: Trigger Email Receipt ---
			await sendReceiptEmail(email, orderId);
		}

		// 7. Handle Payment Failure (Optional but recommended)
		if (event === "payment.failed") {
			const orderId = payload.payload.payment.entity.order_id;

			await prisma.booking.update({
				where: { orderId: orderId },
				data: { status: "FAILED" },
			});

			console.warn(`[FAILURE] Payment failed for Order ${orderId}`);
		}

		// 8. Always return 200 to Razorpay within 2 seconds
		return NextResponse.json({ status: "ok" }, { status: 200 });
	} catch (error: any) {
		console.error("Webhook Route Error:", error.message);
		// We still return 200 to stop Razorpay from retrying endlessly if it's a code error
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 200 },
		);
	}
}
