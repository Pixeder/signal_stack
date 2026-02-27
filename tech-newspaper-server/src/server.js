import { env } from "./config/env.js";
import app from "./app.js";
import { startHNJob } from "./jobs/hn.job.js";
import  connectDB from './config/db.js'
import { startReportJob } from "./jobs/report.job.js";



await connectDB();

const startServer = () => {
  
  startHNJob();
  startReportJob();
  

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer();
