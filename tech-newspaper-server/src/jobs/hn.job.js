import cron from "node-cron";

import { getTopStories } from "../services/hn.service.js";
import { isRelevant } from "../utils/relevance.js";
import { summarizeArticle } from "../services/ai.service.js";
import Article from "../models/article.model.js";
import { getSemanticScore } from "../utils/getSemanticRelevance.js";
import { checkFakeNews } from "../services/fakeCheck.service.js";


// Main Job Function
async function runJob() {
  console.log("🚀 Running HN Fetch Job...");

  try {
    const stories = await getTopStories();

    let savedCount = 0;

    for (const s of stories) {

      // 1️⃣ Basic filters
      if (!s.url) continue;
      if (s.score < 80) continue;

      console.log("📰 Checking:", s.title);

      // 2️⃣ Semantic relevance
      const semanticScore = await getSemanticScore(s);

      console.log("🧠 Semantic:", semanticScore.toFixed(3));

      if (semanticScore < 0.25) {
        console.log("⛔ Not relevant");
        continue;
      }

      // // 3️⃣ Fake news detection
      // const fakeResult = await checkFakeNews(s.title);

      // console.log("🛡️ Fake check:", fakeResult);

      // if (
      //   fakeResult.label === "LABEL_1" &&
      //   fakeResult.score > 0.7
      // ) {
      //   console.log("🚫 Fake detected. Skipping...");
      //   continue;
      // }

      // Check if already exists in DB
      const exists = await Article.findOne({ hnId: s.id });

      if (exists) {
        console.log("⏭️ Skipping existing:", s.title);
        continue;
      }

      console.log("🤖 Summarizing:", s.title);

      // AI Summary
      let summary = "";

      try {
        summary = await summarizeArticle(s.title, s.url);
      } catch (aiErr) {
        console.error("⚠️ AI Error:", aiErr.message);
        continue;
      }

      // Save to DB (Lightweight Cache)
      await Article.create({
        hnId: s.id,
        title: s.title,
        url: s.url,
        score: s.score,
        semanticScore,
        summary
      });

      savedCount++;
    }

    console.log(`✅ Saved ${savedCount} new articles`);

  } catch (err) {
    console.error("❌ HN Job Error:", err.message);
  }
}


// Start Cron
export function startHNJob() {

  // Run immediately on server start
  runJob();

  // Run every 3 hours
  cron.schedule("0 */3 * * *", runJob);

  console.log("⏰ HN Cron Job Started");
}
