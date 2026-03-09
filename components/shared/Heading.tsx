import { cn } from "@/lib/utils";

interface HeadingProps {
	title: string;
	subTitle?: string;
	theme: "light" | "dark";
}

const Heading = (props: HeadingProps) => {
	const { title, subTitle, theme } = props;
	return (
		<div className="text-center my-10 mx-2">
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
		</div>
	);
};

export default Heading;
