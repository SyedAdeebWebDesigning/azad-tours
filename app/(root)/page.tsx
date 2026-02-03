import HeroSection from "@/components/shared/HeroSection";
import Link from "next/link";

export default function Home() {
	if (process.env.IS_DEVELOPMENT !== "true") {
		return (
			<main className="">
				<section>
					<HeroSection />
				</section>
			</main>
		);
	}
	return (
		<main className="min-h-[93vh] flex items-center justify-center bg-gray-50 bgImg">
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
