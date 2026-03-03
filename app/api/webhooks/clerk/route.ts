import {
	createUser,
	deleteUserByClerkId,
	getUserByClerkId,
} from "@/lib/actions/user.action";
import prisma from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request): Promise<Response> {
	const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!SIGNING_SECRET) {
		console.error("Missing CLERK_WEBHOOK_SECRET");
		return new Response("Server configuration error", { status: 500 });
	}

	const headerPayload = headers();

	const svixId = (await headerPayload).get("svix-id");
	const svixTimestamp = (await headerPayload).get("svix-timestamp");
	const svixSignature = (await headerPayload).get("svix-signature");

	if (!svixId || !svixTimestamp || !svixSignature) {
		return new Response("Missing Svix headers", { status: 400 });
	}

	const rawBody = await req.text();

	const wh = new Webhook(SIGNING_SECRET);

	let event: WebhookEvent;

	try {
		event = wh.verify(rawBody, {
			"svix-id": svixId,
			"svix-timestamp": svixTimestamp,
			"svix-signature": svixSignature,
		}) as WebhookEvent;
	} catch (error) {
		console.error("Webhook verification failed:", error);
		return new Response("Invalid signature", { status: 400 });
	}

	try {
		switch (event.type) {
			case "user.created": {
				const { id, email_addresses, first_name, last_name, image_url } =
					event.data;

				const primaryEmail = email_addresses?.[0]?.email_address;

				if (!primaryEmail) {
					console.error("User created without email:", id);
					return new Response("Email missing", { status: 400 });
				}

				await createUser({
					clerkId: id,
					email: primaryEmail,
					firstName: first_name ?? "",
					lastName: last_name ?? "",
					imgUrl: image_url ?? "",
				});

				break;
			}

			case "user.updated": {
				const { id, email_addresses, first_name, last_name, image_url } =
					event.data;

				const existingUser = await getUserByClerkId(id);

				if (!existingUser) {
					console.warn("User not found for update:", id);
					break;
				}

				await prisma.user.update({
					where: { clerkId: id },
					data: {
						email: email_addresses?.[0]?.email_address ?? "",
						firstName: first_name ?? "",
						lastName: last_name ?? "",
						imgUrl: image_url ?? "",
					},
				});

				break;
			}

			case "user.deleted": {
				const { id } = event.data;
				await deleteUserByClerkId(id as string);
				break;
			}

			default:
				console.log("Unhandled event type:", event.type);
		}

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Database operation failed:", error);
		return new Response("Internal server error", { status: 500 });
	}
}
