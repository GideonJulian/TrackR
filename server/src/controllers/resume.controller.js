import Resume from "../models/resume.model.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const resume = await Resume.create({
      title: req.body.title,
      fileUrl: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    });

    res.status(200).json({
      message: "Resumes retrieved successfully",
      resumes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};