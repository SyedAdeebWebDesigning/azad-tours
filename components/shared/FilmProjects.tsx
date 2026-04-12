import Heading from "@/components/shared/Heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clapperboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
	{ title: "Gadar 2", year: 2023, photo: "/assets/movies/gadar-2.jpg" },
	{ title: "Maidaan", year: 2024, photo: "/assets/movies/maidaan.jpg" },
	{ title: "Bawaal", year: 2023, photo: "/assets/movies/bawaal.jpg" },
	{
		title: "The Vaccine War",
		year: 2023,
		photo: "/assets/movies/the-vaccine-war.jpg",
	},
	{
		title: "Main Atal Hoon",
		year: 2024,
		photo: "/assets/movies/main-atal-hoon.jpg",
	},
	{
		title: "Kaun Banega Crorepati",
		year: null,
		photo: "/assets/movies/kbc.jpg",
	},
];

const FilmProjects = () => {
	return (
		<section className="py-24 bg-background">
			<div className="max-w-7xl mx-auto px-4">
				<Heading
					title="Film & Production Projects"
					subTitle="Trusted logistics partner for India's biggest cinematic productions and television networks."
					theme="light"
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
					{projects.map((project, i) => (
						<div
							key={i}
							className="group relative h-160 w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-500 hover:shadow-2xl">
							{/* Background Image */}
							<Image
								src={project.photo}
								alt={project.title}
								fill
								className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
							/>

							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

							{/* Content */}
							<div className="absolute inset-0 p-6 flex flex-col justify-end">
								<div className="flex justify-between items-end">
									<div className="space-y-1">
										<div className="flex items-center gap-2 text-primary mb-2">
											<Clapperboard size={16} className="animate-pulse" />
											<span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70">
												{project.year ? "Feature Film" : "Television Series"}
											</span>
										</div>
										<h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors">
											{project.title}
										</h3>
									</div>

									<Badge
										variant="outline"
										className="bg-white/10 backdrop-blur-md border-white/20 text-white font-mono text-xs py-1">
										{project.year ?? "Multi-year"}
									</Badge>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-center mt-12">
					<Button
						asChild
						size="lg"
						variant="default"
						className="px-8 shadow-lg hover:shadow-primary/20 transition-all">
						<Link href="/projects">
							View All Projects <ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default FilmProjects;
