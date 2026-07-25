import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher([
	"/",
	"/about",
	"/projects",
	"/services",
	"/contact-us",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhooks/clerk",
	"/api/webhooks/razorpay",
]);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};

export function middleware(request: NextRequest) {
	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0] ||
		request.headers.get("x-real-ip") ||
		"Unknown";

	console.log("Client IP:", ip);

	return NextResponse.next();
}
