import Companies from "../models/Companies.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs

// Create a new company
export const createCompany = async (req, res) => {
  const { company_name, location, website, industry } = req.body;

  try {
    // Basic validation
    if (!company_name) {
      return res
        .status(400)
        .json({ success: false, message: "Company name is required" });
    }

    const newCompany = await Companies.create({
      company_id: uuidv4(),
      company_name,
      location,
      website,
      industry,
    });

    res.status(201).json({ success: true, data: newCompany });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findOne({
      where: { company_id: id, is_deleted: false },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a company
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { company_name, location, website, industry } = req.body;

  try {
    const company = await Companies.findOne({
      where: { company_id: id, is_deleted: false },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    // Basic validation
    if (company_name) {
      company.company_name = company_name;
    }
    if (location) {
      company.location = location;
    }
    if (website) {
      company.website = website;
    }
    if (industry) {
      company.industry = industry;
    }

    await company.save();

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete a company
export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findOne({
      where: { company_id: id, is_deleted: false },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    company.is_deleted = true; // Mark as deleted
    await company.save();

    res
      .status(200)
      .json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
