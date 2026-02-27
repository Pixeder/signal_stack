import cron from "node-cron";
import { generateDailyReport } from "../services/report.service.js";


// Main Job Runner
async function runReportJob() {

  console.log("📝 Running Daily Report Generator...");

  try {
    await generateDailyReport();
    console.log("✅ Report job finished");

  } catch (err) {
    console.error("❌ Report Job Error:", err.message);
  }
}


// Start Cron Job
export function startReportJob() {

  // Run once when server starts (important for testing)
  runReportJob();

  // Then run every day at 9 PM
  cron.schedule("0 21 * * *", runReportJob);

  console.log("📊 Report Cron Started (Daily at 9 PM)");
}