import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./routes/health.route.js";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* Routes */
app.use("/api/health", healthRoutes);

/* Default Route */
app.get("/", (req, res) => {
  res.send("Tech Report API is running...");
});

import newsRoutes from "./routes/news.route.js";
app.use("/api/news", newsRoutes);

import reportRoutes from "./routes/report.route.js";
app.use("/api/report", reportRoutes);

import bookmarkRoutes from "./routes/bookmark.route.js";
app.use("/api/bookmark", bookmarkRoutes);


export default app;