import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { Toaster } from "sonner"; // 1. Import the Toaster
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://azadtours.in"),
	title: "Azad Tours and Travels",
	description:
		"Azad Tours and Travels - Reliable, fully-equipped crew transport vehicles designed for production crews, events, and touring teams.",
	alternates: {
		canonical: "/",
	},
	icons: {
		icon: [
			{ url: "/favicon-v2.ico", sizes: "any" },
			{ url: "/favicon.png", sizes: "48x48", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Development Mode Overlay
	if (process.env.IS_DEVELOPMENT === "true") {
		return (
			<html lang="en">
				<body className={`${geistSans.variable} antialiased`}>
					<main className="min-h-screen flex items-center justify-center bg-gray-50 bgImg">
						<section className="text-center max-w-6xl px-6">
							<h1 className="text-4xl font-bold text-gray-900">
								Azad Tours and Travels
							</h1>
							<p className="mt-4 text-gray-600 text-xl sm:text-3xl uppercase">
								website is currently under development.
							</p>
							<div className="mt-6 text-lg text-gray-500">
								<p>
									Contact:{" "}
									<Link
										href="mailto:info@azadtours.in"
										className="font-semibold text-blue-600 hover:underline">
										info@azadtours.in
									</Link>
								</p>
							</div>
						</section>
					</main>
				</body>
			</html>
		);
	}

	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					{children}

					{/* 2. Add Toaster here for contact form notifications */}
					<Toaster position="top-center" richColors />

					<Analytics />
					<SpeedInsights />
					<Script
						src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
						strategy="beforeInteractive"
					/>
				</body>
			</html>
		</ClerkProvider>
	);
}
