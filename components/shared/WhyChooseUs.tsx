"use client";

import { CloudSun, IndianRupee, MapPinned, Users } from "lucide-react";
import Heading from "./Heading";

import { motion } from "framer-motion";

const features = [
	{
		icon: IndianRupee,
		title: "Transparent Pricing",
		description:
			"Know exactly where your money goes with clear trip cost breakdowns. No hidden charges.",
	},
	{
		icon: CloudSun,
		title: "Best Time to Travel",
		description:
			"We guide you on the perfect season to visit destinations across India.",
	},
	{
		icon: Users,
		title: "Family Friendly Trips",
		description:
			"Carefully designed travel plans suitable for families, couples, and groups.",
	},
	{
		icon: MapPinned,
		title: "Smart Travel Planning",
		description:
			"Get travel insights like duration, routes, and practical tips for Indian travelers.",
	},
];

const WhyChooseUs = () => {
	return (
		<motion.div className="backdrop-blur bg-black/50">
			<div className="mx-auto max-w-4xl py-10">
				<motion.div
					initial={{ y: -50, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}>
					<Heading
						title="Why Choose Us"
						subTitle="From transparent pricing to well-planned itineraries, we make every journey comfortable, stress-free, and worth remembering."
						theme="dark"
					/>
				</motion.div>
				<div className="grid gap-8 md:grid-cols-2">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 0 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: 0.3 + index * 0.2,
									duration: 0.5,
									ease: "easeInOut",
								}}
								className="bg-transparent rounded-xl p-6 flex  transition">
								<Icon className="w-15 p-1 text-white mb-4 flex items-center h-full mr-2" />
								<div>
									<h3 className="font-semibold text-neutral-100 text-lg">
										{feature.title}
									</h3>
									<p className="text-sm text-neutral-300">
										{feature.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</motion.div>
	);
};

export default WhyChooseUs;
