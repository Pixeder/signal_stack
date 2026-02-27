import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-02-17"
    unique: true
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Report", reportSchema);