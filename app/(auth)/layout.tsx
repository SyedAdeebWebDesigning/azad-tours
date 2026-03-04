import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex">
			{/* LEFT SIDE - Desktop Only */}
			<div className="hidden md:block w-1/2 bg-blue-50" />

			{/* RIGHT SIDE */}
			<div
				className="flex w-full md:w-1/2 items-center justify-center 
                      bg-blue-50 md:bg-white">
				<div className="w-full max-w-md px-6">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
