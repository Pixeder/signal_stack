import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  hnId: Number,
  title: String,
  url: String,
  score: Number,
  summary: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  },
  fakeScore: {
    type: Number,
    default: 0
  },
  isFake: {
    type: Boolean,
    default: false
  },
  semanticScore: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Article", articleSchema);
