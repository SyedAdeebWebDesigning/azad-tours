import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, Info, LayoutGrid, Mail, MenuIcon, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MenuLink from "./MenuLink";

export const navLinks = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "About", href: "/about", icon: Info },
	{ name: "Services", href: "/services", icon: LayoutGrid },
	{ name: "Contact Us", href: "/contact-us", icon: Mail },
];

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
	return (
		<header className="bg-white shadow-md fixed w-full backdrop-blur-xl z-100">
			<div className="flex items-center justify-between sticky  top-0 w-full z-100 backdrop-blur-2xl max-w-7xl mx-auto px-4 py-2">
				<Link href="/" className="flex items-center h-full">
					<div className="flex items-center px-2 h-full">
						<Image
							src="/assets/Logo.svg"
							alt="Azad Tours Logo"
							width={200}
							height={60}
							priority
							className="sm:h-20 h-16 w-auto object-contain"
						/>
					</div>
				</Link>

				<nav className="flex items-center">
					<ul className="flex items-center justify-between space-x-10">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={cn("group hidden md:flex")}>
								<li className="flex items-center gap-2 group-hover:text-primary transition-colors">
									<link.icon size={16} />
									{link.name}
								</li>
							</Link>
						))}

						<SignedIn>
							<UserButton
								appearance={{
									elements: {
										avatarBox: { width: "32px", height: "32px" },
										userButtonPopoverCard: {
											height: "auto",
											marginTop: "32px",
										},
									},
								}}
							/>
						</SignedIn>

						<SignedOut>
							<Link href="/sign-in">
								<li className="flex items-center gap-2 group-hover:text-primary transition-colors">
									<User2 size={16} />
									Sign In
								</li>
							</Link>
						</SignedOut>
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
						<SheetContent side="bottom" className="h-screen z-100">
							<SheetHeader>
								<SheetTitle>
									<Link href="/" className="flex items-center h-full">
										<div className="flex items-center px-2 h-full">
											<Image
												src="/assets/Logo.svg"
												alt="Azad Tours Logo"
												width={200}
												height={60}
												priority
												className="sm:h-20 h-16 w-auto object-contain"
											/>
										</div>
									</Link>
								</SheetTitle>
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
