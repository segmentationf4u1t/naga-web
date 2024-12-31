// types.ts
export interface FeatureItem {
	src: string;
	alt: string;
	title: string;
	description: string;
	id: string;
}

export type Categories = {
	[key: string]: string[];
	reasoning: string[];
	coding: string[];
	mathematics: string[];
	data_analysis: string[];
	language: string[];
	if: string[];
};

export interface CheckedCategories {
	[key: string]: {
		average: boolean;
		allSubcategories: boolean;
	};
}

export interface ProcessedResults {
	model: string;
	global_average: number;
	reasoning_average: number;
	coding_average: number;
	mathematics_average: number;
	data_analysis_average: number;
	language_average: number;
	if_average: number;
}

export interface SortConfig {
	key: keyof ProcessedResults;
	direction: "asc" | "desc";
}

export interface EvaluationData {
	id: string;
	AMPS_Hard: string;
	LCB_generation: string;
	coding_completion: string;
	connections: string;
	cta: string;
	math_comp: string;
	olympiad: string;
	paraphrase: string;
	plot_unscrambling: string;
	simplify: string;
	spatial: string;
	story_generation: string;
	summarize: string;
	tablejoin: string;
	tablereformat: string;
	typos: string;
	web_of_lies_v2: string;
	zebra_puzzle: string;
}

export interface ModelData {
	id: string;
	type: string;
	modelType?: string;
	description?: string;
	contextLength?: string;
	maxOutput?: string;
	trainingCutoff?: string;
	pricing?: {
		per_input_token?: number;
		per_output_token?: number;
		per_image?: number;
		per_token?: number;
		per_second?: number;
		per_character?: number;
	} | null;
	pricingUrl?: string;
	tiersData: {
		freeLimit?: string;
		tier1Limit?: string;
		tier2Limit?: string;
		tier3Limit?: string;
		tier4Limit?: string;
	};
}

export interface Order {
	id: string;
	userId: string; // ID of the user who placed the order
	items: OrderItem[]; // Items included in the order
	totalAmount: number; // Total amount of the order
	currency: string; // Currency code (e.g., USD, EUR)
	status: OrderStatus; // Current status of the order
	createdAt: Date;
	updatedAt: Date;
}
// Represents a single item in an order
export interface OrderItem {
	productId: string; // ID of the product
	productName: string; // Name of the product
	quantity: number; // Quantity ordered
	price: number; // Price per unit
}
export type OrderStatus =
	| "pending"
	| "processing"
	| "completed"
	| "cancelled"
	| "refunded";

export interface PaymentResponse {
	paymentUrl: string; // URL to redirect the user to for payment
	paymentId: string; // Unique ID assigned to the payment by the provider
	// ... other relevant data you might need from the provider ...
}
// Data received from a payment provider's webhook
export interface PaymentWebhookData {
	paymentId: string; // ID of the payment
	status: string; // Status of the payment (e.g., 'completed', 'failed')
	// ... other relevant data sent by the provider in the webhook ...
}
