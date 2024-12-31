export const CATEGORIES = {
	reasoning: ["connections", "plot_unscrambling", "spatial", "zebra_puzzle"],
	coding: ["coding_completion", "LCB_generation"],
	mathematics: ["math_comp", "olympiad"],
	data_analysis: ["tablejoin", "tablereformat"],
	language: ["paraphrase", "story_generation", "summarize", "typos"],
	if: ["AMPS_Hard", "cta", "simplify", "web_of_lies_v2"],
} as const;

export const curlSnippet = (key: string, modelId: string) => {
	return `curl https://api.naga.ac/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer  ${key}" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "temperature": 0.7
  }'`;
};

export const oaiSnippet = (key: string, modelId: string) => {
	return `from openai import OpenAI
client = OpenAI(
    api_key="${key}",
    base_url="https://api.naga.ac/v1/",
)

response = client.chat.completions.create(
    model="${modelId}",
    messages=[
        {
            "role": "user",
            "content": "Hello, how are you?",
        }
    ],
)
print(response.choices[0].message.content)`;
};

export const aisdkSnippet = (key: string, modelId: string) => {
	return `import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
const openai = createOpenAI({
    baseURL: "https://api.naga.ac/v1",
    apiKey: "${key}",
});

const { text } = await generateText({
    model: openai("${modelId}"),
    prompt: "Hello, how are you?",
});
`;
};
