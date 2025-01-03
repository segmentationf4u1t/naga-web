export const Core = {
	// Service Name
	name: "NagaAI",
	// Service Version
	version: "241024",
	// Service Title
	title: "NagaAI - Cheapest AI API",
	// Service Description
	description: `Unlock the power of artificial intelligence with NagaAI's reliable API access to the latest in AI technology. Empower your projects with next-gen AI capabilities including advanced language models, image generation, text-to-speech, transcription, translation and moderation. Elevate your applications with NagaAI.`,
	// Service Discord
	discord: "https://discord.naga.ac/",
};
const BASE_URL = "https://api.naga.ac/v1/";
//Global Cache 30 mins
export const keepCacheFor: number = 15 * 60;
export const Endpoints = {
	NAGA_BASE_URL: BASE_URL,
	NAGA_MODEL_LIST: `${BASE_URL}models`,
	NAGA_DEFAULT_LIMITS: `${BASE_URL}limits`,
	NAGA_API_DOCS: "https://api.naga.ac/docs",
	NAGA_CHAT_COMPLETIONS: `${BASE_URL}chat/completions`,
	NAGA_EMBEDDINGS: `${BASE_URL}embeddings`,
	NAGA_TOKENIZER: `${BASE_URL}chat/tokenizer`,
	NAGA_IMAGE_GENERATIONS: `${BASE_URL}image/generations`,
	NAGA_TTS_GENERATIONS: `${BASE_URL}audio/tts/generation`,
	NAGA_TRANSCRIPTIONS: `${BASE_URL}audio/transcriptions`,
	NAGA_TRANSLATIONS: `${BASE_URL}audio/translations`,
	NAGA_MODERATIONS: `${BASE_URL}moderations`,
	NAGA_EVALUATIONS: "https://livebench.ai/table_2024_11_25.csv",
};
