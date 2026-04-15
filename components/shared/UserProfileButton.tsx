"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { FaCarSide } from "react-icons/fa";

const UserProfileButton = ({ isAdmin }: { isAdmin: boolean }) => {
	return (
		<UserButton>
			<UserButton.MenuItems>
				<UserButton.Link
					label="Your Bookings"
					labelIcon={<FaCarSide className="size-4" />}
					href="/bookings"
				/>
				{isAdmin && (
					<UserButton.Link
						label="Admin Dashboard"
						labelIcon={<LayoutDashboard className="size-4" />}
						href="/dashboard"
					/>
				)}
			</UserButton.MenuItems>
		</UserButton>
	);
};

export default UserProfileButton;
