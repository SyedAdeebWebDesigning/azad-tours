"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, IndianRupee, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Container from "./Container";
import Heading from "./Heading";

const PlanTrip = () => {
	const steps = [
		{
			title: "Choose Your Destination",
			description: "Select from our wide range of destinations.",
			icon: MapPin,
			color: "#4F46E5", // Indigo
			bgColor: "rgba(79, 70, 229, 0.1)",
		},
		{
			title: "Set Your Budget",
			description: "Input your budget.",
			icon: IndianRupee,
			color: "#10B981", // Emerald
			bgColor: "rgba(16, 185, 129, 0.1)",
		},
		{
			title: "Discover Travel Options",
			description: "Explore the best travel routes.",
			icon: Sparkles,
			color: "#F59E0B", // Amber
			bgColor: "rgba(245, 158, 11, 0.1)",
		},
	];
	return (
		<div>
			<Container>
				<Heading
					title="Plan Your Trip"
					subTitle="Plan your trip with ease using our simple 3-step process."
					theme="light"
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							viewport={{ once: true }}
							className="bg-neutral-50 group border-2 overflow-hidden rounded-xl p-2 transition-shadow duration-300">
							<div className="flex items-center justify-start w-full ">
								<div className="size-10 relative flex items-center justify-center mx-3 rounded-full">
									<div
										className="absolute inset-0 size-10 group-hover:scale-500 transition-all duration-500 rounded-full"
										style={{ backgroundColor: step.bgColor }}
									/>

									<step.icon
										className=" z-10 size-7 sm:size-10 p-1 sm:p-2"
										style={{ color: step.color }}
									/>
								</div>
								<div className="">
									<h3 className="sm:text-xl text-md font-bold">
										{index + 1}. {step.title}
									</h3>
									<p className="text-neutral-700 mt-0 text-sm md:text-base">
										{step.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
				<div className="mx-auto flex items-center justify-center mt-10">
					<Link
						href="/plan"
						className={cn(
							"",
							buttonVariants({ variant: "default", size: "lg" }),
						)}>
						<div className="flex items-center justify-center">
							<h2>Plan Your Trip</h2>
							<span className="ml-1">
								<ArrowRight />
							</span>
						</div>
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default PlanTrip;
