import React from "react";

const Footer = () => {
	return (
		<footer>
			<div className="w-full bg-neutral-50 text-neutral-800 py-6">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<p>
						&copy; {new Date().getFullYear()} Azad Tours and Travels. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
