import Article from "../models/article.model.js";
import Report from "../models/report.model.js";
import { summarizeArticle } from "./ai.service.js";
import OpenAI from "openai";
import { llmConfig } from "../config/llm.js";

const client = new OpenAI({
  apiKey: llmConfig.apiKey,
  baseURL: llmConfig.apiUrl
});

export async function generateDailyReport() {

  const today = new Date().toISOString().split("T")[0];

  // Prevent duplicate report
  const exists = await Report.findOne({ date: today });
  if (exists) {
    console.log("📄 Report already exists for today");
    return;
  }

  const articles = await Article.find();

  if (!articles.length) {
    console.log("⚠️ No articles to generate report");
    return;
  }

  const combinedSummaries = articles
    .map(a =>
      `• ${a.title}
  Link: ${a.url}

  ${a.summary}`
    )
    .join("\n\n");

  const prompt = `
    Create a daily tech digest for a college student.

    For each article, include the clickable link provided.

    Here are today's summarized articles:

    ${combinedSummaries}

    Structure:
    1. Top Highlights (with links)
    2. Key Industry Trends
    3. What Students Should Learn
    4. Recommended Reading (with links)
    5. Action Items

    Use markdown format.
    `;


  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    max_tokens: 800
  });

  const reportContent = response.choices[0].message.content;

  await Report.create({
    date: today,
    content: reportContent
  });

  console.log("✅ Daily report generated");
}
