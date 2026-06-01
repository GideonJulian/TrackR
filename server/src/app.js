import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import jobRouter from "./routes/job.route.js";
import resumeRouter from "./routes/resume.routes.js";


const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://trackr-sepia.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/resumes", resumeRouter);
// health check
app.get("/", (req, res) => {
  res.send("TrackR API is running 🚀");
});

export default app;
