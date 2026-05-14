import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "trackr-sepia.vercel.app",
  // "https://trackr-zpcz.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("TrackR API is running 🚀");
});

export default app;