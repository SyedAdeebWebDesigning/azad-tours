import Heading from "@/components/shared/Heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Clock, Hotel, MapPin, Truck, Users } from "lucide-react";
import Link from "next/link";

const mainServices = [
	{
		title: "Film Production Logistics",
		description:
			"Specialized support for cast and crew, ensuring smooth operations on and off the set.",
		icon: <Camera className="w-6 h-6" />,
		features: [
			"Luxury Vanity Vans",
			"Artist Transportation",
			"Equipment Logistics",
			"Location Support",
		],
		color: "bg-blue-500/10 text-blue-600",
	},
	{
		title: "Bespoke Travel Tours",
		description:
			"Handcrafted itineraries for families and adventurers seeking unforgettable memories.",
		icon: <MapPin className="w-6 h-6" />,
		features: [
			"Cultural Immersions",
			"Adventure Treks",
			"Beach Escapes",
			"Guided City Tours",
		],
		color: "bg-emerald-500/10 text-emerald-600",
	},
];

const secondaryServices = [
	{
		title: "Premium Fleet",
		description: "Modern, air-conditioned vehicles and luxury coaches.",
		icon: <Truck />,
	},
	{
		title: "Hotel Bookings",
		description: "Partnered with top-tier stays for production & leisure.",
		icon: <Hotel />,
	},
	{
		title: "Expert Guidance",
		description: "Seasoned travel experts and professional drivers.",
		icon: <Users />,
	},
	{
		title: "24/7 Support",
		description: "Round-the-clock assistance for urgent shoot requirements.",
		icon: <Clock />,
	},
];

const ServicesPage = () => {
	return (
		<main className="mt-32 px-4 pb-24">
			<div className="max-w-6xl mx-auto">
				<Heading
					title="Our Specialized Services"
					subTitle="From the silver screen to the mountain peak, we provide the logistics and expertise to make every journey a success."
					theme="light"
				/>

				{/* Main Service Pillars */}
				<div className="grid md:grid-cols-2 gap-8 mt-16">
					{mainServices.map((service, i) => (
						<Card
							key={i}
							className="border-none shadow-xl bg-card hover:-translate-y-1 transition-transform duration-300">
							<CardHeader className="flex flex-row items-center gap-4 space-y-0">
								<div className={`p-3 rounded-2xl ${service.color}`}>
									{service.icon}
								</div>
								<CardTitle className="text-2xl">{service.title}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<p className="text-muted-foreground text-lg">
									{service.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{service.features.map((feat) => (
										<Badge
											key={feat}
											variant="secondary"
											className="px-3 py-1 font-medium">
											{feat}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Secondary Services Grid */}
				<div className="mt-24">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">The Azad Advantage</h2>
						<div className="h-1 w-20 bg-primary mx-auto rounded-full" />
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{secondaryServices.map((s, i) => (
							<div
								key={i}
								className="p-6 rounded-2xl border bg-background hover:bg-muted/50 transition-colors">
								{/* <div className="mb-4 text-primary">
									{React.cloneElement(s.icon as React.ReactElement, {
										size: 28,
									})}
								</div> */}
								<h3 className="font-bold mb-2">{s.title}</h3>
								<p className="text-sm text-muted-foreground">{s.description}</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA Spotlight */}
				<Card className="mt-24 bg-neutral-700 text-white overflow-hidden relative border-none">
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
					<CardContent className="p-12 flex flex-col md:flex-row items-center justify-between relative z-10">
						<div className="text-center md:text-left mb-8 md:mb-0">
							<h2 className="text-3xl font-bold mb-2">Need a custom quote?</h2>
							<p className="text-neutral-200 max-w-md">
								Whether {"it's"} a month-long film shoot or a private family
								vacation, {"we'll"} build the perfect package for you.
							</p>
						</div>
						<Link href="/contact-us">
							<Button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all shadow-lg">
								Get in Touch
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default ServicesPage;
