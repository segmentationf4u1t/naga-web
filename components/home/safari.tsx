import Image from "next/image";

interface SafariBrowserProps {
	url?: string;
	children: React.ReactNode;
}

export default function SafariH({ url = "https://naga.ac/dashboard" }) {
	return (
		<div className="p-8 flex items-center justify-center">
			<div className="w-full max-w-3xl bg-background rounded-2xl shadow-xl overflow-hidden border border-border">
				{/* Browser Header */}
				<div className="bg-muted border-b border-border p-3">
					{/* Traffic Lights */}
					<div className="flex items-center gap-2 mb-2">
						<div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
						<div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a032]" />
						<div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24a93b]" />
					</div>

					{/* URL Bar */}
					<div className="bg-background rounded-md border border-border py-1 px-3 flex items-center gap-2">
						<svg
							className="w-4 h-4 text-muted-foreground"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-label="Safari browser icon"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
							/>
						</svg>
						<span className="text-sm text-muted-foreground">{url}</span>
					</div>
				</div>

				{/* Browser Content */}
				<div className="bg-background">
					<Image src="/preview.png" alt="safari" width={1000} height={1000} />
				</div>
			</div>
		</div>
	);
}
