import { Button } from "@/components/ui/button";
interface QuickAction {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}

interface QuickActionsProps {
	actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{actions.map((action) => (
				<Button
					key={action.label}
					variant="outline"
					size="sm"
					className="flex items-center gap-2"
					onClick={action.onClick}
				>
					{action.icon}
					{action.label}
				</Button>
			))}
		</div>
	);
}
