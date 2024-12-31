// ModelTableSkeleton.tsx
import React, { type FC } from "react";
import { Card } from "../ui/card";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const ModelTableSkeleton: FC = () => {
	return (
		<Card className="h-full overflow-auto scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
			<Table>
				<TableHeader>
					<TableRow>
						{Array.from({ length: 8 }, (_, i) => (
							<TableHead
								key={`skeleton-header-${crypto.randomUUID()}`}
								className={i === 0 ? "w-[100px]" : ""}
							>
								<div className="h-4 bg-gray-200 rounded-md animate-pulse" />
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }, (_) => (
						<TableRow key={`skeleton-row-${crypto.randomUUID()}`}>
							{Array.from({ length: 8 }, (_, colIndex) => (
								<TableHead
									key={`skeleton-cell-${crypto.randomUUID()}`}
									className={colIndex === 0 ? "w-[100px] h-[100px]" : ""}
								>
									<div className="h-4 bg-gray-200 rounded-md animate-pulse" />
								</TableHead>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default ModelTableSkeleton;
