import OpenAI from "openai";
import { llmConfig } from "../config/llm.js";

if (!llmConfig.apiKey) {
  throw new Error("LLM API Key missing");
}

const grokClient = new OpenAI({
  apiKey: llmConfig.apiKey,
  baseURL: llmConfig.apiUrl // no endpoint here
});

export async function summarizeArticle(title, url) {

  const prompt = `
  Summarize this tech article for a college student.
  Title: ${title}
  Link: ${url}

  Give:
  - 3 bullet points
  - Why it matters
  - In simple language
  `;

  const response = await grokClient.chat.completions.create({
    model: llmConfig.modelName,
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.4,
    max_tokens: 250
  });

  return response.choices[0].message.content;
}
