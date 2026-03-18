"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeadingProps {
	title: string;
	subTitle?: string;
	theme: "light" | "dark";
}
const Heading = (props: HeadingProps) => {
	const { title, subTitle, theme } = props;
	return (
		<motion.div
			initial={{ y: 0, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="text-center my-10 mx-2">
			<h1
				className={cn(
					"text-2xl md:text-4xl font-semibold",
					theme === "light" ? "text-neutral-900" : "text-neutral-100",
				)}>
				{title}
			</h1>
			<h4
				className={cn(
					"text-sm md:text-lg mt-2",
					theme === "light" ? "text-neutral-600" : "text-neutral-200",
				)}>
				{subTitle}
			</h4>
		</motion.div>
	);
};

export default Heading;
