"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();

	// Logic to check if the current path matches the link or is a sub-page
	const isActive = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	const navItems = [
		{ label: "Overview", href: "/dashboard" },
		{ label: "Manage Vehicles", href: "/dashboard/vehicles" },
		{ label: "Bookings", href: "/dashboard/bookings" },
	];

	return (
		<aside className="w-[30%] min-h-screen bg-neutral-900 text-neutral-100 sticky top-0 border-r border-neutral-800">
			<div className="p-8">
				<h2 className="text-2xl font-black tracking-tighter text-white mb-10 uppercase">
					Fleet Admin
				</h2>

				<nav className="flex flex-col gap-2">
					{navItems.map((item) => {
						const active = isActive(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`px-4 py-3 rounded-xl transition-all duration-200 text-sm tracking-wide ${
									active
										? "bg-neutral-100 text-neutral-900 font-black shadow-lg shadow-black/20"
										: "text-neutral-400 hover:bg-neutral-800 hover:text-white font-medium"
								}`}>
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Optional: Simple DB Status indicator at the bottom */}
			<div className="absolute bottom-8 left-8">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
					<span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
						MongoDB Live
					</span>
				</div>
			</div>
		</aside>
	);
}
