import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
		"Azad Tours and Travels - Reliable, fully-equipped crew transport vehicles designed for production crews, events, and touring teams-built to handle long schedules, tight turnarounds, and on-site demands.",
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
