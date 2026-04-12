import Heading from "@/components/shared/Heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clapperboard } from "lucide-react";
import Link from "next/link";

// Using a curated subset for the homepage
const projects = [
	{ title: "Gadar 2", year: 2023 },
	{ title: "Maidaan", year: 2024 },
	{ title: "Bawaal", year: 2023 },
	{ title: "The Vaccine War", year: 2023 },
	{ title: "Main Atal Hoon", year: 2024 },
	{ title: "Kaun Banega Crorepati", year: null },
];

const FilmProjects = () => {
	return (
		<section className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4">
				<Heading
					title="Film & Production Projects"
					subTitle="Azad Tours and Travels is a trusted partner for major film productions, providing seamless logistics and premium vanity van services."
					theme="light"
				/>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
					{projects.map((project, i) => (
						<Card
							key={i}
							className="group overflow-hidden border-none py-0 shadow-sm hover:shadow-md hover:bg-card/80 transition-all duration-300">
							<CardContent className="p-6 flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="p-2.5 rounded-lg bg-primary/10 text-primary transition-colors">
										<Clapperboard size={20} />
									</div>
									<div>
										<h3 className="font-semibold text-lg leading-tight">
											{project.title}
										</h3>
										{!project.year && (
											<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
												Web Series / TV
											</span>
										)}
									</div>
								</div>

								{project.year ? (
									<Badge variant="outline" className="font-mono">
										{project.year}
									</Badge>
								) : (
									<div>
										<Badge variant="outline" className="font-mono">
											Multi-year
										</Badge>
									</div>
								)}
							</CardContent>
						</Card>
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
