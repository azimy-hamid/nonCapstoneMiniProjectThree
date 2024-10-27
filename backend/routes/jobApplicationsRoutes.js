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

const jobApplicationsRoutes = express.Router();

// Create a new job application
jobApplicationsRoutes.post("/create-job-application", createJobApplication);

jobApplicationsRoutes.put(
  "/update-job-application-company-by-only-id",
  updateJobApplicationCompanyByOnlyId
);

jobApplicationsRoutes.put(
  "/update-job-application-company-by-providing-the-company",
  updateJobApplicationCompanyByProvidingTheCompany
);

// Get all job applications
jobApplicationsRoutes.get("/get-all-job-applications", getAllJobApplications);

// Get a job application by ID
jobApplicationsRoutes.get(
  "/get-job-application-by-id/:id",
  getJobApplicationById
);

// Update a job application
jobApplicationsRoutes.put("/update-job-application/:id", updateJobApplication);

// Soft delete a job application
jobApplicationsRoutes.delete(
  "/delete-job-application/:id",
  deleteJobApplication
);

export default jobApplicationsRoutes;
