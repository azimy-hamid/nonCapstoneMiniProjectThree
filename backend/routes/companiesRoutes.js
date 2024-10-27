import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/companiesControllers.js";

const companiesRoutes = express.Router();

// Create a new company
companiesRoutes.post("/create-company", createCompany);

// Get all companies
companiesRoutes.get("/get-all-companies", getAllCompanies);

// Get a company by ID
companiesRoutes.get("/get-company-by-id/:id", getCompanyById);

// Update a company
companiesRoutes.put("/update-company/:id", updateCompany);

// Soft delete a company
companiesRoutes.delete("/delete-company/:id", deleteCompany);

export default companiesRoutes;
