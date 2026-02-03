import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
	return (
		<div className="relative overflow-hidden mt-30 sm:mt-0">
			{/* Background shape */}
			<div className="absolute -right-60 top-0 -translate-y-1/2 size-300 rounded-full bg-[#4B8AFF1A] z-0 hidden sm:block" />

			{/* Hero container */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 sm:min-h-[calc(100vh-80px)] flex items-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center w-full">
					{/* LEFT CONTENT */}
					<div className="max-w-xl order-2 sm:order-1">
						<h1 className="text-2xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
							Premium Crew Transport Built for Comfort Days
						</h1>

						<p className="mt-5 text-lg text-neutral-600 text-justify">
							Reliable, fully-equipped crew transport vehicles designed for
							production crews, events, and touring teams—built to handle long
							schedules, tight turnarounds, and on-site demands.
						</p>

						{/* CTA */}
						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<Link
								href={"/plan"}
								className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center text-sm justify-center">
								Plan Your Transport
								<ArrowRight className="ml-2 size-4" />
							</Link>
						</div>
					</div>

					{/* RIGHT IMAGE */}
					<div className="relative hidden sm:block order-1 sm:order-2">
						<div className="relative w-175 h-100">
							<Image
								src="/assets/cars/car-hero.webp"
								alt="Crew transport vehicle"
								fill
								priority
								className="object-contain scale-130"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
