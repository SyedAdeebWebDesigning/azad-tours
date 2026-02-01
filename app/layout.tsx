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
	title: "Azad Tours and Travels",
	description:
		"Explore the world with Azad Tours and Travels. Your adventure starts here.",
};

/**
 * Root layout component that sets global fonts, language, and page-level wrappers.
 *
 * @param children - The page content to render inside the layout's <body>.
 * @returns The top-level HTML structure (<html lang="en">) whose <body> applies font CSS variables and `antialiased`, contains `children`, and includes analytics and speed-insights components.
 */
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