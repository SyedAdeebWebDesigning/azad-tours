import Heading from "@/components/shared/Heading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Container from "./Container";
const Testimonials = () => {
	const testimonials = [
		{
			name: "Nisha Khot",
			feedback:
				"Would highly recommend their services. Haroun provided us with an excellent car from Lucknow to Khajuraho despite our last-minute request. A special thanks to our driver Talib, who drove the huge distance with focus and safety.",
			rating: 5,
		},
		{
			name: "Fardeen Malik",
			feedback:
				"One day I had to send my sister to her college in Delhi so that I booked a car with AZAD TOURS ND TARVEL and they sent me a good driver who did take my sister to colloge she reached Delhi comfortably thanks to Haroon Ji. THANK YOU AZAD TOURS & TRAVEL ❤️🙏",
			rating: 5,
		},
		{
			name: "Musheer Khan",
			feedback:
				"A totally professional way of service. Felt relaxed, secure and best was a beautiful way of greeting! T",
			rating: 5,
		},
	];

	const googleReviewLink =
		"https://www.google.com/search?sca_esv=b8727ca78a0892ec&sxsrf=ANbL-n6QMbm9Jfr283BlRSf0HEurBMQ3rw:1775953405095&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOSYjXA-aEWglRi0Z08XLJPk4mqwiEKE1OjxTgmiIyf_SS2MwXcApky5JAI8zA1ysMJUAUYyyufiyibC_mbDJMtWKdOjlEaoqZQTWYfSp4Tv32K1zbA%3D%3D&q=Azad+Tours+%26+Travels+Reviews&sa=X&ved=2ahUKEwjUrOT-heeTAxU2UGcHHV0gDyYQ0bkNegQIPRAH&biw=1710&bih=1033&dpr=2";

	return (
		<Container>
			<section className=" pb-20 bg-background">
				<div className="max-w-7xl mx-auto px-4">
					<Heading
						title="Client Stories"
						subTitle="From family vacations to major film sets, see why our clients trust Azad Tours and Travels."
						theme="light"
					/>

					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="relative border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-muted/20">
								<CardContent className="pt-10 pb-6 px-6">
									{/* Decorative Quote Icon */}
									<Quote className="absolute top-4 left-4 text-primary/10 h-8 w-8" />

									<p className="text-muted-foreground leading-relaxed italic relative z-10">
										{testimonial.feedback}
									</p>
								</CardContent>

								<CardFooter className="px-6 pb-6 pt-0 flex flex-col items-start gap-2">
									<div className="h-px w-8 bg-primary/30 mb-2" />
									<div className="flex items-center justify-between w-full">
										<span className="font-bold text-foreground tracking-tight">
											{testimonial.name}
										</span>
										<div className="flex text-amber-500">
											{Array.from({ length: 5 }).map((_, i) => (
												<span key={i} className="text-lg">
													{i < testimonial.rating ? "★" : "☆"}
												</span>
											))}
										</div>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>

					<div className="flex justify-center mt-12">
						<Link href={googleReviewLink} target="_blank" className="group">
							<div className="flex items-center gap-3 bg-card border px-6 py-3 rounded-full shadow-sm group-hover:shadow-md group-hover:bg-muted transition-all">
								<FcGoogle className="text-2xl" />
								<span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground">
									See our rating on Google Reviews
								</span>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</Container>
	);
};

export default Testimonials;
