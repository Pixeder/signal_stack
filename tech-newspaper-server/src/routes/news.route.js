import express from "express";
import Article from "../models/article.model.js";

const router = express.Router();

router.get("/hackernews", async (req, res) => {

  try {

    const data = await Article
      .find()
      .sort({ score: -1 })
      .limit(20);

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;
