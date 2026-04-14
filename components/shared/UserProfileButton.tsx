"use client";

import { UserButton } from "@clerk/nextjs";
import { FaCarSide } from "react-icons/fa";

const UserProfileButton = () => {
	return (
		<UserButton>
			<UserButton.MenuItems>
				<UserButton.Link
					label="Your Bookings"
					labelIcon={<FaCarSide className="size-4" />}
					href="/bookings"
				/>
			</UserButton.MenuItems>
		</UserButton>
	);
};

export default UserProfileButton;
