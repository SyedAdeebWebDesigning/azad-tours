/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
	const name = formData.get("fullname") as string;
	const email = formData.get("email") as string;
	const type = formData.get("type") as string;
	const message = formData.get("message") as string;

	if (!name || !email || !message) {
		return { error: "Please fill in all required fields." };
	}

	try {
		await resend.emails.send({
			// Now using your branded domain!
			// This makes the email appear as "John Doe via Azad" in your inbox.
			from: `${name} | Azad Website <noreply@azadtours.in>`,

			// Your primary inbox
			to: "info@azadtours.in",

			// Clicking 'Reply' will now correctly open a draft to the customer's email
			replyTo: email,

			subject: `New ${type} Inquiry: ${name}`,
			html: `
                <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; max-width: 600px;">
                    <h2 style="color: #111827; margin-bottom: 20px; font-size: 24px;">New Website Inquiry</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Sender:</td>
                            <td style="padding: 8px 0; font-weight: bold;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                            <td style="padding: 8px 0;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;">Inquiry Type:</td>
                            <td style="padding: 8px 0;">
                                <span style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${type}</span>
                            </td>
                        </tr>
                    </table>
        
                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; margin-bottom: 8px;">Message:</p>
                        <p style="white-space: pre-wrap; color: #374151; line-height: 1.6; background: #f9fafb; padding: 15px; border-radius: 8px;">
                            ${message}
                        </p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">
                        This email was sent via the Azad Tours and Travels contact form.
                    </p>
                </div>
            `,
		});

		return { success: true };
	} catch (error: any) {
		return {
			error: "Failed to send message. Please try again later.",
			message: error.message,
		};
	}
}
