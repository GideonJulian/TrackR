import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";

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

// health check
app.get("/", (req, res) => {
  res.send("TrackR API is running 🚀");
});

export default app;