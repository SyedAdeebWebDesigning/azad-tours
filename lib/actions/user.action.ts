"use server";

import prisma from "../prisma";

export const createUser = async (data: {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	imgUrl: string;
}) => {
	try {
		const user = await prisma.user.create({
			data: {
				clerkId: data.clerkId,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				imgUrl: data.imgUrl,
			},
		});

		return {
			success: true,
			user,
		};
	} catch (error) {
		return {
			success: false,
			message: "Error creating user",
		};
	}
};

export const getUserByClerkId = async (clerkId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { clerkId },
		});
		return user;
	} catch (error) {
		console.error("Error fetching user by Clerk ID:", error);
	}
};

export const deleteUserByClerkId = async (clerkId: string) => {
	try {
		await prisma.user.delete({
			where: { clerkId },
		});
	} catch (error) {
		console.error("Error deleting user by Clerk ID:", error);
	}
};
