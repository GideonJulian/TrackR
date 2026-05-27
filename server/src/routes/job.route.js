import express from "express";

import {
  addJob,
  getJob,
  getJobs,
  updateJob,
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

/**
 * GET SINGLE JOB
 */
jobRouter.get("/:id", protectRoute, getJob);

/**
 * UPDATE JOB
 */
jobRouter.put("/:id", protectRoute, updateJob);

export default jobRouter;
