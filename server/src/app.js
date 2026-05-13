import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("TrackR API is running 🚀");
});

export default app;