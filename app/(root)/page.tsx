import Cities from "@/components/shared/Cities";
import HeroSection from "@/components/shared/HeroSection";
import WhyChooseUs from "@/components/shared/WhyChooseUs";

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
				<Cities />
			</section>
		</main>
	);
}
