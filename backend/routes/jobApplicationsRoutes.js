import express from "express";
import {
  createJobApplication,
  updateJobApplicationCompanyByOnlyId,
  updateJobApplicationCompanyByProvidingTheCompany,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/jobApplicationsControllers.js"; // Adjust the path as necessary
import authenticate from "../middlewares/authentication.js";

const jobApplicationsRoutes = express.Router();

// Create a new job application
jobApplicationsRoutes.post(
  "/create-job-application",
  authenticate,
  createJobApplication
);

jobApplicationsRoutes.put(
  "/update-job-application-company-by-only-id",
  authenticate,
  updateJobApplicationCompanyByOnlyId
);

jobApplicationsRoutes.put(
  "/update-job-application-company-by-providing-the-company",
  authenticate,
  updateJobApplicationCompanyByProvidingTheCompany
);

// Get all job applications
jobApplicationsRoutes.get(
  "/get-all-job-applications",
  authenticate,
  getAllJobApplications
);

// Get a job application by ID
jobApplicationsRoutes.get(
  "/get-job-application-by-id/:id",
  authenticate,
  getJobApplicationById
);

// Update a job application
jobApplicationsRoutes.put(
  "/update-job-application/:id",
  authenticate,
  updateJobApplication
);

// Soft delete a job application
jobApplicationsRoutes.delete(
  "/delete-job-application/:id",
  authenticate,
  deleteJobApplication
);

export default jobApplicationsRoutes;
