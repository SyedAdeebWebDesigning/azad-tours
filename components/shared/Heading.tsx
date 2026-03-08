interface HeadingProps {
	title: string;
	subTitle?: string;
}

const Heading = (props: HeadingProps) => {
	return (
		<div className="text-center">
			<h1 className="text-2xl md:text-4xl text-neutral-900 font-semibold">
				{props.title}
			</h1>
			<h4 className="text-md md:text-lg mt-2 text-neutral-600">
				{props.subTitle}
			</h4>
		</div>
	);
};

export default Heading;
