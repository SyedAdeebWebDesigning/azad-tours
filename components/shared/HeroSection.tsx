"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { motion } from "framer-motion";

const HeroSection = () => {
	return (
		<div className="relative overflow-hidden mt-30 sm:mt-0">
			{/* Background shape */}
			<motion.div
				initial={{ opacity: 0, scale: 0.2 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="absolute -right-60 top-0 -translate-y-1/2 size-300 rounded-full bg-primary/20 z-0 hidden sm:block"
			/>

			{/* Hero container */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 sm:min-h-[calc(100vh-80px)] flex items-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center w-full">
					{/* LEFT CONTENT */}
					<div className="max-w-xl order-2 sm:order-1">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="text-2xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
							Premium Crew Transport Built for Comfort Days
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mt-5 text-lg text-neutral-600 text-justify">
							Reliable, fully-equipped crew transport vehicles designed for
							production crews, events, and touring teams-built to handle long
							schedules, tight turnarounds, and on-site demands.
						</motion.p>

						{/* CTA */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="mt-8 flex flex-col sm:flex-row gap-4">
							<Link
								href={"/plan"}
								className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition flex items-center text-sm justify-center">
								Plan Your Transport
								<ArrowRight className="ml-2 size-4" />
							</Link>
						</motion.div>
					</div>

					{/* RIGHT IMAGE */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8, x: 50 }}
						animate={{ opacity: 1, scale: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="relative hidden sm:block order-1 sm:order-2">
						<div className="relative w-175 h-100">
							<Image
								src="/assets/cars/car-hero.webp"
								alt="Crew transport vehicle"
								fill
								priority
								className="object-contain scale-130"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
