import Link from "next/link";

const year = new Date().getFullYear();

const Footer = () => {
	return (
		<footer className="bg-neutral-100 text-neutral-700">
			<div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
				{/* Brand */}
				<div>
					<h2 className="text-xl font-semibold text-black mb-3">
						Azad Tours and Travels
					</h2>
					<p className="text-sm leading-relaxed">
						Creating unforgettable travel experiences across India. From city
						tours to luxury transportation services, we ensure every journey is
						comfortable and memorable.
					</p>

					<p className="mt-3 font-semibold text-black text-sm">
						We also provide luxury vanity vans for film production crews.
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h3 className="text-black font-semibold mb-4">Quick Links</h3>
					<ul className="space-y-2 text-sm">
						<li className="hover:text-black cursor-pointer">
							<Link href="/">Home</Link>
						</li>
						<li className="hover:text-black cursor-pointer">
							<Link href="/about">About</Link>
						</li>
						<li className="hover:text-black cursor-pointer">
							<Link href="/services">Services</Link>
						</li>
						<li className="hover:text-black cursor-pointer">
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div>
					<h3 className="text-black font-semibold mb-4">Contact</h3>
					<ul className="space-y-2 text-sm">
						<li>📍 India</li>
						<li>
							<Link href="tel:+917860304246">📞 +91 78603 04246</Link>
						</li>
						<li>
							<Link href="mailto:info@azadtours.in">✉️ info@azadtours.in</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-neutral-200">
				<div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
					<p>© {year} Azad Tours and Travels. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
