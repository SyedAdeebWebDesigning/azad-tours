import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";

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
		"Azad Tours and Travels - Reliable, fully-equipped crew transport vehicles designed for production crews, events, and touring teams—built to handle long schedules, tight turnarounds, and on-site demands.",

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
	if (process.env.IS_DEVELOPMENT === "true") {
		return (
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
								href="mailto:dev@azadtours.in"
								className="font-semibold text-blue-600 hover:underline">
								dev@azadtours.in{" "}
							</Link>
							for inquiries and updates.
						</p>
					</div>
				</section>
			</main>
		);
	}
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
