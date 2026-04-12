import Heading from "@/components/shared/Heading";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Map, Star, Truck, Users } from "lucide-react";

const Page = () => {
	return (
		<main className="mt-32 px-4 pb-20">
			<div className="max-w-5xl mx-auto">
				<Heading title="About Our Journey" theme="light" />

				<section className="mt-16 grid lg:grid-cols-5 gap-12 items-start">
					{/* Left: Main Story */}
					<div className="lg:col-span-3 space-y-8">
						<div className="space-y-4">
							<h2 className="text-3xl font-bold tracking-tight text-primary">
								Redefining Travel & Logistics
							</h2>
							<p className="text-xl text-muted-foreground leading-relaxed">
								<span className="font-semibold text-foreground">
									Azad Tours and Travels
								</span>{" "}
								is a premier travel agency dedicated to creating high-end
								experiences for explorers and production crews alike.
							</p>
						</div>

						<div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
							<p>
								With years of industry expertise, we specialize in designing
								personalized travel itineraries tailored to the unique interests
								of every traveler. We bridge the gap between imagination and
								execution, making every trip seamless.
							</p>
							<p>
								Our passionate team plans every detail  from luxury
								transportation to curated guided experiences  ensuring comfort
								and unforgettable memories along the way.
							</p>
						</div>

						<Separator className="my-8" />

						{/* Values Grid */}
						<div className="grid sm:grid-cols-2 gap-6">
							<div className="flex gap-4">
								<div className="mt-1 p-2 rounded-md bg-primary/10 text-primary h-fit">
									<Users size={20} />
								</div>
								<div>
									<h4 className="font-bold">Expert Team</h4>
									<p className="text-sm text-muted-foreground">
										Dedicated specialists for every journey.
									</p>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="mt-1 p-2 rounded-md bg-primary/10 text-primary h-fit">
									<Map size={20} />
								</div>
								<div>
									<h4 className="font-bold">Custom Routes</h4>
									<p className="text-sm text-muted-foreground">
										Itineraries built around your preferences.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right: Specialty Spotlight */}
					<div className="lg:col-span-2">
						<Card className="border-none bg-primary text-primary-foreground shadow-2xl">
							<CardContent className="p-8 space-y-6">
								<div className="p-3 rounded-full bg-white/10 w-fit">
									<Truck size={32} className="text-white" />
								</div>
								<h3 className="text-2xl font-bold">Production Logistics</h3>
								<p className="text-primary-foreground/80 leading-relaxed">
									We are a leading provider of{" "}
									<span className="font-bold text-white">
										luxury vanity vans
									</span>{" "}
									for major film productions. Our fleet offers high-comfort,
									private on-location spaces designed specifically for elite
									artists and hardworking production crews.
								</p>
								<div className="pt-4 flex items-center gap-2 text-sm font-medium">
									<Star size={16} className="fill-white" />
									<span>Trusted by the Indian Film Industry</span>
								</div>
							</CardContent>
						</Card>

						<div className="mt-8 p-6 rounded-xl border-2 border-dashed border-muted flex flex-col items-center text-center space-y-2">
							<span className="text-4xl font-black text-muted/30">AZAD</span>
							<p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
								Established Excellence
							</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Page;
