"use client";
import Link from "next/link";

import {
	Home,
	FileAxis3D,
	FileQuestion,
	BarChartBig,
	Binary,
	Search,
	HandCoins,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import UserBar from "./userBar";
import { usePathname } from "next/navigation";

type NavLinkProps = {
	href: string;
	children: React.ReactNode;
	icon: React.ElementType;
	disabled?: boolean;
	className?: string;
	isActive?: boolean;
};

const NavLink = ({
	href,
	children,
	icon: Icon,
	disabled = false,
	className,
}: NavLinkProps) => {
	const pathname = usePathname();
	const isCurrentPath = pathname === href;

	const linkClass = cn(
		"flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
		{
			"bg-muted text-primary": isCurrentPath && !disabled,
			"text-muted-foreground": !isCurrentPath && !disabled,
			"hover:text-primary": !disabled,
			"opacity-50 cursor-not-allowed": disabled,
		},
		className,
	);

	const content = (
		<>
			<Icon className="h-4 w-4" />
			{children}
		</>
	);

	return disabled ? (
		<span
			className={linkClass}
			title="This feature is currently unavailable for your account"
		>
			{content}
		</span>
	) : (
		<Link href={href} className={linkClass}>
			{content}
		</Link>
	);
};

interface DashboardNavigationProps {
	userName: string;
	userImage: string;
	modelCount: {
		count: number;
		timestamp: string;
	};
}

export default function DashboardNavigation({
	userName,
	userImage,
	modelCount,
}: DashboardNavigationProps) {
	return (
		<nav className="grid items-start text-sm font-medium p-2">
			<div className="flex h-14 items-center ">
				<aside className="w-64 bg-sidebar border-b">
					<UserBar
						name={userName}
						tier="TBA"
						avatarUrl={userImage}
						creditsLeft={100}
					/>
					{/* Add other sidebar content here */}
				</aside>
			</div>
			<NavLink href="/dashboard" icon={Home}>
				Dashboard
			</NavLink>
			<NavLink href="/dashboard/models" icon={FileAxis3D}>
				Models
				<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
					{modelCount.count}
				</Badge>
			</NavLink>

			<NavLink href="/dashboard/docs" icon={FileQuestion}>
				Docs
			</NavLink>

			<NavLink href="/dashboard/librechat" icon={Binary}>
				LibreChat
			</NavLink>
			<NavLink href="/dashboard/SearchEngine" icon={Search} disabled>
				Perplexity
				<Badge
					className="ml-auto flex shrink-0 items-right justify-right"
					variant="outline"
				>
					No Access
				</Badge>
			</NavLink>
			<NavLink href="/dashboard/" icon={BarChartBig}>
				V/I Modality
			</NavLink>
			<NavLink href="/dashboard/profile" icon={BarChartBig}>
				Profile & Analytics
			</NavLink>
			<NavLink href="/dashboard/profile/billing" icon={HandCoins}>
				Billing
			</NavLink>
		</nav>
	);
}
