import express from "express";
import Report from "../models/report.model.js";

const router = express.Router();

router.get("/today", async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  const report = await Report.findOne({ date: today });

  if (!report) {
    return res.json({
      success: false,
      message: "Report not generated yet"
    });
  }

  res.json({
    success: true,
    data: report
  });
});

router.get("/history", async (req, res) => {

  try {

    const reports = await Report
      .find()
      .sort({ date: -1 }) // newest first
      .select("date createdAt");

    res.json({
      success: true,
      data: reports
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

router.get("/:date", async (req, res) => {

  try {

    const report = await Report.findOne({
      date: req.params.date
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    res.json({
      success: true,
      data: report
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

export default router;
