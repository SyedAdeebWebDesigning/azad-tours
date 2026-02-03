import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="overflow-x-hidden">
			<Navbar />
			{children}
			<Footer />
		</main>
	);
};

export default Layout;
