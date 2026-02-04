"use client";

import { motion } from "framer-motion";
import { navLinks } from "./Navbar";

const MenuLink = () => {
	return (
		<ul className="flex flex-col items-start m-10 justify-between space-y-10 md:hidden mt-10">
			{navLinks.map((link, index) => (
				<li key={link.name} className="text-xl">
					<motion.a
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1, duration: 0.3 }}
						className="flex items-center gap-2 hover:text-blue-600 transition-colors"
						href={link.href}>
						<link.icon size={20} />
						{link.name}
					</motion.a>
				</li>
			))}
		</ul>
	);
};

export default MenuLink;
