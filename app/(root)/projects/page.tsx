"use client";

import Heading from "@/components/shared/Heading";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";

const projects = [
	{ title: "Children of Freedom", year: 2025 },
	{ title: "Nishanchi", year: 2025 },
	{ title: "Raat Akeli Hai 2", year: 2025 },
	{ title: "Stay Forever", year: 2025 },
	{ title: "Mandalam", year: 2025 },
	{ title: "Parivarik Manoranjan", year: 2025 },
	{ title: "Maalik", year: 2025 },
	{ title: "Add Chocolate", year: 2024 },
	{ title: "Add Cipla", year: 2024 },
	{ title: "Main Atal Hoon", year: 2024 },
	{ title: "The Signature", year: 2024 },
	{ title: "LLB", year: 2024 },
	{ title: "Maidaan", year: 2023 },
	{ title: "Bawaal", year: 2023 },
	{ title: "Gadar 2", year: 2023 },
	{ title: "Dehati Ladke", year: 2023 },
	{ title: "The Vaccine War", year: 2023 },
	{ title: "Jogira Sara Ra Ra", year: 2023 },
	{ title: "Mai", year: 2022 },
	{ title: "Annanth", year: 2022 },
	{ title: "Khuda Hafiz 2", year: 2022 },
	{ title: "Robert", year: 2021 },
	{ title: "Satyam 2", year: 2021 },
	{ title: "14 Phere", year: 2021 },
	{ title: "Rosie", year: 2021 },
	{ title: "Gulabo Sitabo", year: 2020 },
	{ title: "Petta", year: 2019 },
	{ title: "Stree", year: 2018 },
	{ title: "Ya Raab", year: 2014 },
	{ title: "Bullet Raja", year: 2013 },
	{ title: "Pati Patni Aur Woh", year: 1978 },
	{ title: "Kaun Banega Crorepati", year: null },
	{ title: "Rangbaaz 3", year: null },
	{ title: "Abhay 3", year: null },
	{ title: "Jamtara 2", year: null },
	{ title: "Bunty Babli", year: null },
	{ title: "Bhaukaal 3", year: null },
	{ title: "LSG Cricket", year: null },
	{ title: "Baano", year: null },
];

const ProjectsPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProjects = projects.filter((p) =>
		p.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<main className="mt-32 px-4 pb-20">
			<div className="max-w-3xl mx-auto">
				<Heading
					title="Film & Production Projects"
					subTitle="Azad Tours and Travels has proudly supported numerous film productions, web series, and commercial shoots with premium logistics and luxury vanity vans."
					theme="light"
				/>

				{/* Search Bar */}
				<div className="relative mt-12 mb-8 max-w-sm ml-auto">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search projects..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				{/* Shadcn Table */}
				<div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
					<Table>
						<TableHeader className="bg-muted/50">
							<TableRow>
								<th className="h-12 px-6 text-left align-middle font-bold text-foreground">
									Project Name
								</th>
								<th className="h-12 px-6 text-right align-middle font-bold text-foreground">
									Release/Type
								</th>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProjects.length > 0 ? (
								filteredProjects.map((project, i) => (
									<TableRow
										key={i}
										className="hover:bg-muted/30 transition-colors">
										<td className="px-6 py-4 font-medium text-lg">
											{project.title}
										</td>
										<td className="px-6 py-4 text-right">
											{project.year ? (
												<Badge variant="outline" className="font-semibold px-3">
													{project.year}
												</Badge>
											) : (
												<Badge
													variant="secondary"
													className="font-medium text-xs">
													Series / Multi-year
												</Badge>
											)}
										</td>
									</TableRow>
								))
							) : (
								<TableRow>
									<td
										colSpan={2}
										className="h-24 text-center text-muted-foreground">
										No projects found matching your search.
									</td>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</main>
	);
};

export default ProjectsPage;
