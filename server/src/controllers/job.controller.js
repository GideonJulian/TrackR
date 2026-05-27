import Job from "../models/job.model.js";

/**
 * ADD JOB
 */
export const addJob = async (req, res) => {
  try {
    const {
      company,
      role,
      status,
      location,
      salary,
      jobLink,
      notes,
    } = req.body;

    const job = await Job.create({
      company,
      role,
      status,
      location,
      salary,
      jobLink,
      notes,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job added successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL JOBS
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE JOB
 */
export const getJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE JOB
 */
export const updateJob = async (req, res) => {
  try {
    const {
      company,
      role,
      status,
      location,
      salary,
      jobLink,
      notes,
    } = req.body;

    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        company,
        role,
        status,
        location,
        salary,
        jobLink,
        notes,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
