import Sidebar from "@/components/admin/Sidebar";
import { checkAdminStatus } from "@/lib/actions/user.action";

import { redirect } from "next/navigation";
import { Suspense } from "react";

// Skeleton for the 70% content area
function DashboardSkeleton() {
	return (
		<div className="animate-pulse space-y-8">
			<div className="flex justify-between items-end pb-8 border-b border-neutral-200">
				<div className="space-y-3">
					<div className="h-12 w-48 bg-neutral-200 rounded-xl" />
					<div className="h-4 w-64 bg-neutral-200 rounded-lg" />
				</div>
				<div className="h-14 w-36 bg-neutral-200 rounded-2xl" />
			</div>
			<div className="grid grid-cols-4 gap-4">
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className="h-24 bg-neutral-100 rounded-2xl border border-neutral-200"
					/>
				))}
			</div>
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className="h-28 bg-white rounded-2xl border border-neutral-200"
					/>
				))}
			</div>
		</div>
	);
}

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// 1. Internal check (Fetches Clerk ID & Checks MongoDB Role)
	const isAdmin = await checkAdminStatus();

	if (!isAdmin) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen w-full bg-neutral-50 text-neutral-900">
			{/* Sidebar renders immediately as it is a Client Component */}
			<Sidebar />

			<main className="w-[70%] p-10 overflow-y-auto">
				<div className="max-w-5xl mx-auto">
					<Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
				</div>
			</main>
		</div>
	);
}
