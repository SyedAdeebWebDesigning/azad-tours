import Cities from "@/components/shared/Cities";
import FilmProjects from "@/components/shared/FilmProjects";
import HeroSection from "@/components/shared/HeroSection";
import PlanTrip from "@/components/shared/PlanTrip";
import Testimonials from "@/components/shared/Testimonials";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import { Separator } from "@/components/ui/separator";

export default function Home() {
	return (
		<main className="">
			<section className="mt-20">
				<HeroSection />
			</section>
			<section className="_bg">
				<WhyChooseUs />
			</section>
			<section>
				<FilmProjects />
			</section>
			<section>
				<Cities />
			</section>
			<section>
				<PlanTrip />
			</section>
			<Separator className="my-20 bg-neutral-200" />
			<section className="">
				<Testimonials />
			</section>
		</main>
	);
}
