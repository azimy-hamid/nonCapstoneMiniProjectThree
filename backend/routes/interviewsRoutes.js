import express from "express";
import {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from "../controllers/interviewsControllers.js";

import authenticate from "../middlewares/authentication.js";

const interviewsRoutes = express.Router();

// Create a new interview
interviewsRoutes.post("/create-interview", authenticate, createInterview);

// Get all interviews
interviewsRoutes.get("/get-all-interviews", authenticate, getAllInterviews);

// Get an interview by ID
interviewsRoutes.get(
  "/get-interview-by-id/:id",
  authenticate,
  getInterviewById
);

// Update an interview
interviewsRoutes.put("/update-interview/:id", authenticate, updateInterview);

// Soft delete an interview
interviewsRoutes.delete("/delete-interview/:id", authenticate, deleteInterview);

export default interviewsRoutes;
