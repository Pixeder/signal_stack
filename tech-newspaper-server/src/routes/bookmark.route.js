import express from "express";
import Bookmark from "../models/bookmark.model.js";
import Report from "../models/report.model.js";

const router = express.Router();


// Save bookmark
router.post("/:reportId", async (req, res) => {

  try {

    const report = await Report.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    const exists = await Bookmark.findOne({
      report: report._id
    });

    if (exists) {
      return res.json({
        success: true,
        message: "Already bookmarked"
      });
    }

    await Bookmark.create({
      report: report._id
    });

    res.json({
      success: true,
      message: "Bookmarked successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});


// Get all bookmarks
router.get("/", async (req, res) => {

  try {

    const bookmarks = await Bookmark
      .find()
      .populate("report")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookmarks
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});


// Remove bookmark
router.delete("/:reportId", async (req, res) => {

  try {

    await Bookmark.findOneAndDelete({
      report: req.params.reportId
    });

    res.json({
      success: true,
      message: "Bookmark removed"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});

export default router;
