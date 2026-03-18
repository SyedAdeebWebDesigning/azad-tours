"use client";

import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

const Cities = () => {
	const cities = [
		{
			name: "Delhi",
			description:
				"Our Delhi hub connects you to major routes across North India. Reliable travel services with smooth planning and support.",
			image: "/assets/cities/delhi.png",
		},
		{
			name: "Agra",
			description:
				"Serving Agra with seamless travel arrangements and guided routes. Ideal for both short trips and extended journeys.",
			image: "/assets/cities/agra.png",
		},
		{
			name: "Lucknow",
			description:
				"Our base in Lucknow ensures dependable travel services across the region. Quick bookings, trusted routes, and local expertise.",
			image: "/assets/cities/lucknow.png",
		},
		{
			name: "Mumbai",
			description:
				"Providing travel solutions in Mumbai with efficient planning and connectivity. Perfect for business and leisure trips.",
			image: "/assets/cities/mumbai.png",
		},
		{
			name: "Jaipur",
			description:
				"Covering Jaipur with well-organized travel services and flexible options. Experience smooth journeys across Rajasthan.",
			image: "/assets/cities/jaipur.png",
		},
		{
			name: "Kolkata",
			description:
				"Extending our services in Kolkata with reliable travel support. Designed for comfort, convenience, and easy connectivity.",
			image: "/assets/cities/kolkata.png",
		},
	];

	return (
		<section className="bg-neutral-100 py-16">
			<div className="mx-auto max-w-6xl px-4">
				{/* Heading */}
				<Heading
					title="Major Cities We Serve"
					subTitle="Delivering reliable and seamless travel services across key cities in India."
					theme="light"
				/>

				{/* Grid */}
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cities.map((city, idx) => (
						<Link
							href={`/cities/${city.name.toLowerCase()}`}
							key={idx}
							className="group bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow">
							{/* Image */}
							<div className="relative w-full h-72 mb-5 overflow-hidden">
								<Image
									src={city.image}
									alt={city.name}
									fill
									className="object-contain transition-transform duration-300 scale-[125%]  group-hover:scale-[130%]"
								/>
							</div>

							{/* Text */}
							<h3 className="text-lg font-semibold text-gray-900">
								{city.name}
							</h3>

							<p className="text-sm text-gray-500 mt-1">{city.description}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Cities;
