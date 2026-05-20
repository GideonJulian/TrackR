import express from "express";

import {
  addJob,
  getJobs,
} from "../controllers/job.controller.js";

import protectRoute from "../middleware/auth.middleware.js";

const jobRouter = express.Router();

/**
 * ADD JOB
 */
jobRouter.post("/", protectRoute, addJob);

/**
 * GET JOBS
 */
jobRouter.get("/", protectRoute, getJobs);

export default jobRouter;