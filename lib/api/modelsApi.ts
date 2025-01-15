import { Endpoints } from "@/conf/cfg";
import { keepCacheFor } from "@/conf/cfg";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Model } from "@/types/models";

enum modelType {
	Text = "Text",
	Image = "Image",
	Audio = "Audio",
	Multimodal = "Multimodal",
	Embedding = "Embedding",
	Moderation = "Moderation",
	Unknown = "Unknown",
}
// Mad inheritance system for model configs
// 29.11.24

const baseModelConfigs: Record<
	string,
	{
		contextLength: number | undefined;
		description: string;
		company: string;
		maxOutput: number | undefined;
		trainingCutoff: string | undefined;
		type: modelType;
	}
> = {
	"claude-3.5-sonnet": {
		contextLength: 200000,
		description:
			"Claude 3.5 Sonnet strikes the ideal balance between intelligence and speed—particularly for enterprise workloads. It delivers strong performance at a lower cost compared to its peers, and is engineered for high endurance in large-scale AI deployments.",
		company: "Anthropic",
		maxOutput: 8192,
		trainingCutoff: "Apr 2024",
		type: modelType.Text,
	},
	"claude-3.5-haiku": {
		contextLength: 200000,
		description:
			"Claude 3.5 Haiku is a powerful, multimodal model that can process and generate text, images, and audio. It's designed for a wide range of applications, including content creation, data analysis, and more.",
		company: "Anthropic",
		maxOutput: 8192,
		trainingCutoff: "Jul 2024",
		type: modelType.Text,
	},
	"claude-3-opus": {
		contextLength: 200000,
		description:
			"Claude 3 Opus is a powerful, multimodal model that can process and generate text, images, and audio. It's designed for a wide range of applications, including content creation, data analysis, and more.",
		company: "Anthropic",
		maxOutput: 4096,
		trainingCutoff: "Aug 2023",
		type: modelType.Text,
	},
	"claude-3-sonnet": {
		contextLength: 200000,
		description:
			"Claude 3 Sonnet is a powerful, multimodal model that can process and generate text, images, and audio. It's designed for a wide range of applications, including content creation, data analysis, and more.",
		company: "Anthropic",
		maxOutput: 4096,
		trainingCutoff: "Aug 2023",
		type: modelType.Text,
	},
	"claude-3-haiku": {
		contextLength: 200000,
		description:
			"Claude 3 Haiku is a powerful, multimodal model that can process and generate text, images, and audio. It's designed for a wide range of applications, including content creation, data analysis, and more.",
		company: "Anthropic",
		maxOutput: 4096,
		trainingCutoff: "Aug 2024",
		type: modelType.Text,
	},
	"chatgpt-4o-latest": {
		contextLength: 128000,
		description: "The latest ChatGPT-4o model.",
		company: "OpenAI",
		maxOutput: 16384,
		trainingCutoff: "Oct 2023",
		type: modelType.Multimodal,
	},
	"gpt-4o": {
		contextLength: 128000,
		description: "The latest GPT-4o model.",
		company: "OpenAI",
		maxOutput: 16384,
		trainingCutoff: "Oct 2023",
		type: modelType.Multimodal,
	},
	"o1-preview": {
		contextLength: 128000,
		description:
			"A new series of AI models designed to spend more time thinking before they respond. These models can reason through complex tasks and solve harder problems.",
		company: "OpenAI",
		maxOutput: 32768,
		trainingCutoff: "Oct 2023",
		type: modelType.Text,
	},
	"o1-mini": {
		contextLength: 128000,
		description:
			"O1 Mini is a smaller version of the O1 model, designed for more resource-constrained environments. It's a powerful tool for a wide range of applications, including content creation, data analysis, and more.",
		company: "OpenAI",
		maxOutput: 65536,
		trainingCutoff: "Oct 2023",
		type: modelType.Text,
	},
	"gpt-4-turbo": {
		contextLength: 128000,
		description:
			"The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.",
		company: "OpenAI",
		maxOutput: 4096,
		trainingCutoff: "Dec 2023",
		type: modelType.Text,
	},
	"gpt-3.5-turbo": {
		contextLength: 16385,
		description: "The latest GPT-3.5 Turbo model.",
		company: "OpenAI",
		maxOutput: 4096,
		trainingCutoff: "Sep 2021",
		type: modelType.Text,
	},
	"dall-e-2": {
		contextLength: undefined,
		description:
			"The previous DALL·E model released in Nov 2022. The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model.",
		company: "OpenAI",
		maxOutput: undefined,
		trainingCutoff: undefined,
		type: modelType.Image,
	},
	"dall-e-3": {
		contextLength: undefined,
		description: "The latest DALL·E model released in Nov 2023",
		company: "OpenAI",
		maxOutput: undefined,
		trainingCutoff: undefined,
		type: modelType.Image,
	},
	"omni-moderation": {
		contextLength: 32768,
		description:
			"Latest pinned version of our new multi-modal moderation model, capable of analyzing both text and images.",
		company: "OpenAI",
		maxOutput: undefined,
		trainingCutoff: undefined,
		type: modelType.Moderation,
	},
	"text-moderation": {
		contextLength: 32768,
		description: "The latest text moderation model.",
		company: "OpenAI",
		maxOutput: undefined,
		trainingCutoff: undefined,
		type: modelType.Moderation,
	},
	"llama-3": {
		contextLength: 8192,
		description: "The latest Llama-3 model.",
		company: "Meta",
		maxOutput: 4096,
		trainingCutoff: "Dec 2023",
		type: modelType.Text,
	},
	"llama-3.2": {
		contextLength: 128000,
		description: "The latest Llama-3.2 model.",
		company: "Meta",
		maxOutput: 4096,
		trainingCutoff: "Dec 2023",
		type: modelType.Text,
	},
	"learnlm-1.5-pro": {
		contextLength: 32768,
		description: "The latest LearnLM-1.5 Pro model.",
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: undefined,
		type: modelType.Text,
	},
	"gemini-1.5-pro": {
		contextLength: 2000000,
		description: "The latest Gemini-1.5 Pro model.",
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: "Sep 2023",
		type: modelType.Multimodal,
	},
	"gemini-1.5-flash": {
		contextLength: 1000000,
		description:
			"The latest Gemini-1.5 Flash model. Points to gemini-1.5-flash-002",
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: "Sep 2024 ",
		type: modelType.Multimodal,
	},
	"llama-3.2-vision": {
		contextLength: 128000,
		description: "The latest Llama-3.2 Vision model.",
		company: "Meta",
		maxOutput: 8192,
		trainingCutoff: "Dec 2023",
		type: modelType.Multimodal,
	},
	"mixtral-8x22b": {
		contextLength: 64000,
		description:
			"Mixtral 8x22B is MistralAI's latest open model. It sets a new standard for performance and efficiency within the AI community. It is a sparse Mixture-of-Experts (SMoE) model that uses only 39B active parameters out of 141B, offering unparalleled cost efficiency for its size.",
		company: "MistralAi",
		maxOutput: 8192,
		trainingCutoff: "Sep 2021?",
		type: modelType.Text,
	},
	"command-r-plus": {
		contextLength: 128000,
		description:
			"C4AI Command R+ is an open weights research release of a 104B billion parameter model with highly advanced capabilities, this includes Retrieval Augmented Generation (RAG) and tool use to automate sophisticated tasks. ",
		company: "Cohere",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	"command-r": {
		contextLength: 128000,
		description:
			"Command R is a generative model optimized for long context tasks such as retrieval-augmented generation (RAG) and using external APIs and tools. As a model built for companies to implement at scale, Command R boasts:",
		company: "Cohere",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	codestral: {
		contextLength: 32768,
		description:
			"Codestral is Mistral AI’s first-ever code model designed for code generation tasks. ",
		company: "MistralAi",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Multimodal,
	},
	"claude-2.1": {
		contextLength: 200000,
		description: "Older version of Claude family, practically useless.",
		company: "Anthropic",
		maxOutput: 4096,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	"claude-instant": {
		contextLength: 200000,
		description: "Older version of Claude family, practically useless.",
		company: "Anthropic",
		maxOutput: 4096,
		trainingCutoff: "No data",
		type: modelType.Multimodal,
	},
	"llama-2": {
		contextLength: 4096,
		description:
			"Llama 2 is a collection of pretrained and fine-tuned generative text models ranging in scale from 7 billion to 70 billion parameters. This is the repository for the 7B fine-tuned model, optimized for dialogue use cases and converted for the Hugging Face Transformers format. Links to other models can be found in the index at the bottom.",
		company: "Meta",
		maxOutput: 4096,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	"mistral-7b-instruct": {
		contextLength: 64000,
		description: "Mistral 7B Instruct model.",
		company: "MistralAi",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	"mixtral-8x7b-instruct": {
		contextLength: 64000,
		description:
			"Mixtral 8x7B Instruct is a state-of-the-art language model using a Sparse Mixture of Experts architecture with eight 7B experts. It excels at text generation, code, reasoning and supports multiple languages. The model outperforms Llama 2 70B while maintaining faster inference.",
		company: "MistralAi",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Text,
	},
	"flux-1.1-pro-ultra": {
		contextLength: 0,
		description:
			"Flux 1.1 Pro Ultra is an advanced AI image generator from Black Forest Labs supporting up to 4MP resolution with Ultra and Raw modes. Known for fast generation (~10s), high quality output, and excellent prompt adherence.",
		company: "Black Forest Labs",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"gemini-exp-1206": {
		contextLength: 2000000,
		description: "Gemini 2.0-Flash experimental model.",
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: "No data",
		type: modelType.Multimodal,
	},
	"flux-1.1-pro": {
		contextLength: 0,
		description:
			"Flux 1.1 Pro is an advanced AI image generator from Black Forest Labs supporting up to 4MP resolution with Ultra and Raw modes. Known for fast generation (~10s), high quality output, and excellent prompt adherence.",
		company: "Black Forest Labs",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"flux-1-pro": {
		contextLength: 0,
		description:
			"Flux 1.1 Pro is an advanced AI image generator from Black Forest Labs supporting up to 4MP resolution with Ultra and Raw modes. Known for fast generation (~10s), high quality output, and excellent prompt adherence.",
		company: "Black Forest Labs",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"flux-1-dev": {
		contextLength: 0,
		description:
			"Flux 1.1 Dev is an advanced AI image generator from Black Forest Labs supporting up to 4MP resolution with Ultra and Raw modes. Known for fast generation (~10s), high quality output, and excellent prompt adherence.",
		company: "Black Forest Labs",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"flux-1-schnell": {
		contextLength: 0,
		description:
			"Flux 1.1 Schnell is an advanced AI image generator from Black Forest Labs supporting up to 4MP resolution with Ultra and Raw modes. Known for fast generation (~10s), high quality output, and excellent prompt adherence.",
		company: "Black Forest Labs",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"stable-diffusion-3.5-large": {
		contextLength: 0,
		description: "",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	midjourney: {
		contextLength: 0,
		description: "0",
		company: "Midjourney",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"playground-v2.5": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	sdxl: {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"kandinsky-3.1": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"kandinsky-3": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"kandinsky-2": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"text-embedding-3-small": {
		contextLength: 0,
		description: "0",
		company: "OpenAI",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Embedding,
	},
	"text-embedding-3-large": {
		contextLength: 0,
		description: "0",
		company: "OpenAI",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Embedding,
	},
	"text-embedding-ada-002": {
		contextLength: 0,
		description: "0",
		company: "OpenAI",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Embedding,
	},
	"bge-large-en-v1.5": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Embedding,
	},
	"text-moderation-latest": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Moderation,
	},
	"text-moderation-stable": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Moderation,
	},
	"whisper-large-v3": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"m2m100-1.2b": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"xtts-v2": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	bark: {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"eleven-multilingual-v2": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"eleven-multilingual-v1": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"eleven-turbo-v2": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"eleven-monolingual-v1": {
		contextLength: 0,
		description: "0",
		company: "0",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Audio,
	},
	"gemini-2.0-flash-exp": {
		contextLength: 1000000,
		description: "Latest Gemini 2.0 Model",
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: "Aug 2024",
		type: modelType.Multimodal,
	},
	"gemini-2.0-flash-thinking-exp-1219": {
		contextLength: 32768,
		description: `Gemini 2.0 Flash Thinking Mode is an experimental model that's trained to generate the "thinking process" the model goes through as part of its response. As a result, Thinking Mode is capable of stronger reasoning capabilities in its responses than the Gemini 2.0 Flash Experimental model.`,
		company: "Google",
		maxOutput: 8192,
		trainingCutoff: "Aug 2024",
		type: modelType.Text,
	},
	"grok-beta": {
		contextLength: 131072,
		description:
			"Grok-beta is a preview version of the Grok language model developed by xAI, currently in the final stages of development.",
		company: "xAI",
		maxOutput: 8192,
		trainingCutoff: "Real-time",
		type: modelType.Text,
	},
	"grok-2-vision-1212": {
		contextLength: 8192,
		description:
			"Grok 2 Vision 1212 is a preview version of the Grok 2 language model developed by xAI, currently in the final stages of development.",
		company: "xAI",
		maxOutput: 8192,
		trainingCutoff: "Real-time",
		type: modelType.Multimodal,
	},
	"stable-diffusion-3-large": {
		contextLength: 0,
		description:
			"Stable Diffusion 3.5 Large is a Multimodal Diffusion Transformer (MMDiT) text-to-image model that features improved performance in image quality, typography, complex prompt understanding, and resource-efficiency.",
		company: "StabilityAI",
		maxOutput: 0,
		trainingCutoff: "No data",
		type: modelType.Image,
	},
	"grok-2-1212": {
		contextLength: 131072,
		description:
			"Grok 2 1212 is a snapshot version of the Grok 2 language model developed by xAI, currently in the final stages of development.",
		company: "xAI",
		maxOutput: 8192,
		trainingCutoff: "Real-time",
		type: modelType.Text,
	},
	o1: {
		contextLength: 200000,
		description:
			"The o1 series of models are trained with reinforcement learning to perform complex reasoning. o1 models think before they answer, producing a long internal chain of thought before responding to the user.",
		company: "OpenAI",
		maxOutput: 100000,
		trainingCutoff: "Oct 2023",
		type: modelType.Text,
	},
};

// Lista bazowych nazw modeli posortowana według długości (najdłuższe najpierw)
const baseModelNames = Object.keys(baseModelConfigs).sort(
	(a, b) => b.length - a.length,
);

/**
 * Funkcja do uzyskania bazowej nazwy modelu na podstawie identyfikatora modelu.
 * Sprawdza, czy identyfikator modelu zaczyna się od którejkolwiek z bazowych nazw modeli.
 * @param modelId - identyfikator modelu
 * @returns bazowa nazwa modelu lub null, jeśli nie znaleziono
 */
const getBaseModelName = (modelId: string): string | null => {
	for (const baseName of baseModelNames) {
		if (modelId.startsWith(baseName)) {
			return baseName;
		}
	}
	return null;
};

// Modified modelAdditionalInfo with inheritance
export const modelAdditionalInfo: Record<
	string,
	{
		contextLength?: number | undefined;
		description?: string;
		company?: string;
		maxOutput?: number | undefined;
		trainingCutoff?: string | undefined;
		type?: modelType;
		evaluationAlias?: string;
	}
> = {
	// Define specific models with their unique properties
	"gpt-4o-2024-05-13": {
		...baseModelConfigs["gpt-4o"],

		description: "Original gpt-4o snapshot from May 13, 2024.",
		maxOutput: 4096,
		evaluationAlias: "gpt-4o",
	},
	"gpt-3.5-turbo-instruct": {
		...baseModelConfigs["gpt-3.5-turbo"],
		description:
			"Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions.",
		company: "OpenAI",
		maxOutput: 4096,
	},
	"gpt-4-turbo-preview": {
		...baseModelConfigs["gpt-4-turbo"],
		description:
			"GPT-4 Turbo preview model. Currently points to gpt-4-0125-preview.",
	},
	"gpt-4-0125-preview": {
		...baseModelConfigs["gpt-4o"],
		description:
			"GPT-4 Turbo preview model intended to reduce cases of “laziness” where the model doesn’t complete a task.",
		type: modelType.Text,
	},
	"gpt-4-1106-preview": {
		...baseModelConfigs["gpt-4o"],
		description:
			"GPT-4 Turbo preview model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. This is a preview model.",
		type: modelType.Text,
	},
	"gpt-4-0613": {
		...baseModelConfigs["gpt-4o"],
		description:
			"Snapshot of gpt-4 from June 13th 2023 with improved function calling support.",
		maxOutput: 8192,
		contextLength: 8192,
		type: modelType.Text,
		trainingCutoff: "Sep 2021",
	},
	"gemini-exp-1121": {
		...baseModelConfigs["gemini-1.5-pro"],
		description:
			"Gemini 1.5 Pro experimental model. With enhanced coding, reasoning, and perception capabilities",
	},
	"gemini-exp-1114": {
		...baseModelConfigs["gemini-1.5-pro"],
		description:
			"Gemini 1.5 Pro experimental model. With quality improvements.",
	},
	"gemini-1.5-pro-exp-0801": {
		...baseModelConfigs["gemini-1.5-pro"],
		description: "Gemini 1.5 Pro experimental model.",
	},
	"llama-3.2-90b-vision-instruct": {
		...baseModelConfigs["llama-3.2"],
		description:
			"The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image. The models outperform many of the available open source and closed multimodal models on common industry benchmarks.",
		contextLength: 128000,
		type: modelType.Multimodal,
	},
	"llama-3.2-11b-vision-instruct": {
		...baseModelConfigs["llama-3.2"],
		description:
			"The Llama 3.2-Vision instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image. The models outperform many of the available open source and closed multimodal models on common industry benchmarks.",
		contextLength: 128000,
		type: modelType.Multimodal,
	},
	"gpt-3.5-turbo-0125": {
		...baseModelConfigs["gpt-3.5-turbo"],
		description:
			"The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. ",
		trainingCutoff: "Sep 2021",
		type: modelType.Text,
	},
	"gpt-3.5-turbo-1106": {
		...baseModelConfigs["gpt-3.5-turbo"],
		description:
			"GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more.",
		type: modelType.Text,
	},
	"claude-3.5-sonnet-20241022": {
		...baseModelConfigs["claude-3.5-sonnet"],
		description: "Snapshot of Claude 3.5 Sonnet from October 22nd 2024.",
		evaluationAlias: "claude-3-5-sonnet-20241022",
	},
	"claude-3.5-haiku-20241022": {
		...baseModelConfigs["claude-3.5-haiku"],
		description: "Snapshot of Claude 3.5 Haiku from October 22nd 2024.",
		evaluationAlias: "claude-3-5-haiku-20241022",
	},
	//Hack!
	"chatgpt-4o-latest": {
		...baseModelConfigs["gpt-4o"],
		description:
			"The chatgpt-4o-latest model version continuously points to the version of GPT-4o used in ChatGPT, and is updated frequently, when there are significant changes.",
		evaluationAlias: "gpt-4o-2024-11-20",
	},
};

// Funkcja do uzyskania dodatkowych informacji o modelu
export const getAdditionalInfo = (modelId: string) => {
	const lowercaseId = modelId.toLowerCase();
	const baseName = getBaseModelName(lowercaseId);
	return (
		modelAdditionalInfo[lowercaseId] ||
		(baseName && baseModelConfigs[baseName]) || {
			contextLength: 0,
			description: "No description available",
			company: "Unknown",
			type: modelType.Unknown,
			maxOutput: undefined,
			trainingCutoff: undefined,
		}
	);
};
//27.03 Caching for Query
//14.10.24 Additional context length, description and company info added
//29.11.24 rework of the model configs and additional info
//
export const modelsApi = createApi({
	reducerPath: "modelsApi",
	baseQuery: fetchBaseQuery({ baseUrl: Endpoints.NAGA_BASE_URL }),
	endpoints: (build) => ({
		getModels: build.query<Model[], void>({
			query: () => "models",
			transformResponse: (response: { data: Model[] }) => {
				return response.data
					.filter((model) => model.object === "model")
					.map((model) => {
						const additionalInfo = getAdditionalInfo(model.id);
						return {
							...model,
							modelType: additionalInfo.type ?? modelType.Text,
							contextLength: additionalInfo.contextLength ?? 0,
							description:
								additionalInfo.description ?? "No description available",
							company: additionalInfo.company ?? "Unknown",
							maxOutput: additionalInfo.maxOutput,
							trainingCutoff: additionalInfo.trainingCutoff,
						};
					});
			},
			keepUnusedDataFor: keepCacheFor,
		}),
		// Nowy endpoint do uzyskania całkowitej liczby modeli
		getTotalModels: build.query<number, void>({
			query: () => "models",
			transformResponse: (response: { data: Model[] }) => {
				return response.data.filter((model) => model.object === "model").length;
			},
			keepUnusedDataFor: keepCacheFor,
		}),
		// Nowy endpoint do uzyskania liczby modeli według typu
		getModelTypeCounts: build.query<Record<string, number>, void>({
			query: () => "models",
			transformResponse: (response: { data: Model[] }) => {
				const models = response.data.filter(
					(model) => model.object === "model",
				);
				const counts: Record<string, number> = {
					Text: 0,
					Image: 0,
					Audio: 0,
					Multimodal: 0,
					Embedding: 0,
					Moderation: 0,
				};
				for (const model of models) {
					const additionalInfo = getAdditionalInfo(model.id);
					const type = additionalInfo.type || "Unknown";
					counts[type] = (counts[type] || 0) + 1;
				}
				return counts;
			},
			keepUnusedDataFor: keepCacheFor,
		}),
	}),
});

// Aktualizacja eksportowanych hooków
export const {
	useGetModelsQuery,
	useGetTotalModelsQuery,
	useGetModelTypeCountsQuery,
} = modelsApi;
