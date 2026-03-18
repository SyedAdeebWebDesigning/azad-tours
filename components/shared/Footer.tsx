const year = new Date().getFullYear();

const Footer = () => {
	return (
		<footer>
			<div className="w-full bg-neutral-50 text-neutral-800 py-6">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<p>&copy; {year} Azad Tours and Travels. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
