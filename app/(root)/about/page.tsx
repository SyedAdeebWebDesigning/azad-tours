import Heading from "@/components/shared/Heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Map, Star, Truck, Users } from "lucide-react";

// Placeholder for owner details
const owner = {
	name: "Mr. Harun", // Replace with real name
	title: "Founder & CEO",
	image: "/assets/owner.jpeg", // Path to the portrait image
};

const Page = () => {
	return (
		<main className="mt-32 px-4 pb-24">
			<div className="max-w-7xl mx-auto">
				<Heading title="About Our Journey" theme="light" />

				{/* Main Content & Portrait Split */}
				<section className="mt-16 grid lg:grid-cols-12 gap-16 items-start">
					{/* Left: Main Story */}
					<div className="lg:col-span-8 space-y-12">
						<div className="space-y-6">
							<h2 className="text-4xl font-extrabold tracking-tight text-neutral-700 leading-tight">
								Redefining Travel & Production Logistics
							</h2>
							<p className="text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl">
								<span className="font-semibold text-foreground">
									Azad Tours and Travels
								</span>{" "}
								is a premier travel agency dedicated to creating high-end,
								seamless experiences for explorers and production crews alike.
							</p>
						</div>

						<div className="space-y-8 text-muted-foreground leading-relaxed text-lg max-w-3xl">
							<p>
								With years of industry expertise, we specialize in designing
								personalized travel itineraries tailored to the unique interests
								of every traveler. We bridge the gap between imagination and
								execution.
							</p>
							<p>
								Our passionate team plans every detail from luxury
								transportation to curated guided experiences ensuring comfort
								and unforgettable memories along the way.
							</p>
						</div>

						<Separator className="max-w-xl" />

						{/* Core Competencies/Values */}
						<div className="grid sm:grid-cols-2 gap-10 max-w-3xl pt-4">
							<div className="flex gap-5 items-start">
								<div className="mt-1 p-3 rounded-xl bg-primary/10 text-primary h-fit">
									<Users size={22} />
								</div>
								<div className="space-y-1">
									<h4 className="font-bold text-lg">Expert Team</h4>
									<p className="text-muted-foreground leading-relaxed">
										Dedicated specialists for every journey, from tour planners
										to professional drivers.
									</p>
								</div>
							</div>
							<div className="flex gap-5 items-start">
								<div className="mt-1 p-3 rounded-xl bg-primary/10 text-primary h-fit">
									<Map size={22} />
								</div>
								<div className="space-y-1">
									<h4 className="font-bold text-lg">Bespoke Journeys</h4>
									<p className="text-muted-foreground leading-relaxed">
										Itineraries built exclusively around your preferences,
										guaranteeing a unique experience.
									</p>
								</div>
							</div>
						</div>

						{/* Industry Highlight (Vanity Vans) */}
						<div className="p-6 rounded-2xl bg-muted/20 border-l-4 border-primary/40 flex flex-col sm:flex-row gap-5 sm:items-center max-w-3xl">
							<div className="p-3 rounded-full bg-primary/10 text-primary h-fit">
								<Truck size={24} />
							</div>
							<div className="flex-1">
								<p className="font-semibold text-foreground">
									Specialized Production Logistics
								</p>
								<p className="text-sm text-muted-foreground leading-relaxed">
									We are a trusted provider of high-comfort, private{" "}
									<span className="font-bold text-primary/80">
										luxury vanity vans
									</span>{" "}
									designed specifically for elite artists and film crews during
									intense on-location shoots.
								</p>
							</div>
							<div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
								<Star size={14} className="fill-amber-400 text-amber-500" />
								<span>Trusted By Bollywood</span>
							</div>
						</div>
					</div>

					{/* Right: Owner Portrait */}
					<aside className="lg:col-span-4 sticky top-40 space-y-10">
						<div className="p-5 rounded-3xl border bg-card shadow-2xl space-y-6">
							{/* Avatar or Image */}
							<Avatar className="w-full h-auto aspect-4/5 rounded-2xl overflow-hidden shadow-lg">
								<AvatarImage
									src={owner.image}
									alt={owner.name}
									className="object-cover"
								/>
								<AvatarFallback className="text-5xl font-extrabold bg-primary/5 text-primary/40 rounded-2xl">
									{owner.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>

							<div className="text-center pt-2 pb-1 space-y-1.5">
								<h3 className="text-2xl font-bold tracking-tight">
									{owner.name}
								</h3>
								<p className="text-base text-muted-foreground font-medium uppercase tracking-widest flex items-center justify-center gap-2">
									<Briefcase size={16} />
									{owner.title}
								</p>
							</div>
						</div>
					</aside>
				</section>
			</div>
		</main>
	);
};

export default Page;
