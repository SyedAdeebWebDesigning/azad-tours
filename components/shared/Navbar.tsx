import { Home, Info, LayoutGrid, Mail, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import MenuLink from "./MenuLink";
import { cn } from "@/lib/utils";

export const navLinks = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "About", href: "/about", icon: Info },
	{ name: "Services", href: "/services", icon: LayoutGrid },
	{ name: "Contact Us", href: "/contact-us", icon: Mail },
];

const Navbar = () => {
	return (
		<header className=" shadow-md fixed w-full backdrop-blur-xl z-100">
			<div className="flex items-center justify-between sticky top-0 w-full z-100 backdrop-blur-2xl max-w-7xl mx-auto px-4 py-2">
				<Link href="/" className="flex items-center h-full">
					<div className="flex items-center px-2 h-full">
						<Image
							src="/assets/Logo.svg"
							alt="Azad Tours Logo"
							width={200}
							height={60}
							priority
							className="h-10 w-auto object-contain"
						/>
					</div>
				</Link>

				<nav>
					{/* Future navigation items can be added here */}
					<ul className="hidden items-center justify-between space-x-10 md:flex">
						{navLinks.map((link) => (
							<Link key={link.name} href={link.href} className={cn("group")}>
								<li className="flex items-center gap-2 group-hover:text-primary transition-colors">
									<link.icon size={16} />
									{link.name}
								</li>
							</Link>
						))}
					</ul>

					{/* Mobile Navigation */}
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant={"ghost"}
								size={"icon-lg"}
								className="flex md:hidden">
								<MenuIcon className="size-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="top" className="h-screen ">
							<SheetHeader>
								<SheetTitle>Azad Tours & Travels</SheetTitle>
							</SheetHeader>
							<MenuLink />
						</SheetContent>
					</Sheet>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
