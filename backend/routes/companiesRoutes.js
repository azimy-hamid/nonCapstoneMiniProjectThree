import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companiesControllers.js";

import authenticate from "../middlewares/authentication.js";

const companiesRoutes = express.Router();

// Create a new company
companiesRoutes.post("/create-company", authenticate, createCompany);

// Get all companies
companiesRoutes.get("/get-all-companies", authenticate, getAllCompanies);

// Get a company by ID
companiesRoutes.get("/get-company-by-id/:id", authenticate, getCompanyById);

// Update a company
companiesRoutes.put("/update-company/:id", authenticate, updateCompany);

// Soft delete a company
companiesRoutes.delete("/delete-company/:id", authenticate, deleteCompany);

export default companiesRoutes;
