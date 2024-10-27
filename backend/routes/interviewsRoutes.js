import express from "express";
import {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewsControllers.js";

const interviewsRoutes = express.Router();

// Create a new interview
interviewsRoutes.post("/create-interview", createInterview);

// Get all interviews
interviewsRoutes.get("/get-all-interviews", getAllInterviews);

// Get an interview by ID
interviewsRoutes.get("/get-interview-by-id/:id", getInterviewById);

// Update an interview
interviewsRoutes.put("/update-interview/:id", updateInterview);

// Soft delete an interview
interviewsRoutes.delete("/delete-interview/:id", deleteInterview);

export default interviewsRoutes;
