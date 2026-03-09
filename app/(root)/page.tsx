import HeroSection from "@/components/shared/HeroSection";
import WhyChooseUs from "@/components/shared/WhyChooseUs";

export default function Home() {
	return (
		<main className="">
			<section className="mt-40">
				<HeroSection />
			</section>
			<section className="rumi-bg">
				<WhyChooseUs />
			</section>
		</main>
	);
}
