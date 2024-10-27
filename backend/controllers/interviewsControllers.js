import Interviews from "../models/Interviews.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs

// Create a new interview
export const createInterview = async (req, res) => {
  const { application_id, interview_date, interview_stage, feedback, result } =
    req.body;

  try {
    // Basic validation
    if (!application_id || !interview_date || !interview_stage) {
      return res.status(400).json({
        success: false,
        message: "Application ID, interview date, and stage are required",
      });
    }

    const newInterview = await Interviews.create({
      interview_id: uuidv4(),
      application_id,
      interview_date,
      interview_stage,
      feedback,
      result,
    });

    res.status(201).json({ success: true, data: newInterview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all interviews
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interviews.findAll({
      where: { is_deleted: false },
    });
    res.status(200).json({ success: true, data: interviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get an interview by ID
export const getInterviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const interview = await Interviews.findOne({
      where: { interview_id: id, is_deleted: false },
    });

    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });
    }

    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update an interview
export const updateInterview = async (req, res) => {
  const { id } = req.params;
  const { application_id, interview_date, interview_stage, feedback, result } =
    req.body;

  try {
    const interview = await Interviews.findOne({
      where: { interview_id: id, is_deleted: false },
    });

    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });
    }

    // Basic validation
    if (application_id) {
      interview.application_id = application_id;
    }
    if (interview_date) {
      interview.interview_date = interview_date;
    }
    if (interview_stage) {
      interview.interview_stage = interview_stage;
    }
    if (feedback) {
      interview.feedback = feedback;
    }
    if (result) {
      interview.result = result;
    }

    await interview.save();

    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete an interview
export const deleteInterview = async (req, res) => {
  const { id } = req.params;

  try {
    const interview = await Interviews.findOne({
      where: { interview_id: id, is_deleted: false },
    });

    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "Interview not found" });
    }

    interview.is_deleted = true; // Mark as deleted
    await interview.save();

    res
      .status(200)
      .json({ success: true, message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
