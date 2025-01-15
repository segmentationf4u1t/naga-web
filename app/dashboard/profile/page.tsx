import ApiKeyGenerator from "@/components/dashboard/profile/keygen";

import { StatisticsTable } from "@/components/dashboard/statistics/statistics-table";
import { AreaChartInteractive } from "@/components/dashboard/statistics/area-chart";
import SecurityLog from "@/components/dashboard/profile/security-log";

export default function Profile() {
	return (
		<div className="mx-auto px-4 py-4 space-y-4">
			<div className="grid grid-cols-1 gap-4 w-full">
				<AreaChartInteractive />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<StatisticsTable />
				<SecurityLog />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<ApiKeyGenerator />
			</div>
		</div>
	);
}
