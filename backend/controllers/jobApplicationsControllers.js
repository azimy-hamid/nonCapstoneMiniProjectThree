import JobApplications from "../models/JobApplications.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs
import Statuses from "../models/Statuses.js";
import Users from "../models/Users.js";
import Companies from "../models/Companies.js";
import Contacts from "../models/Contacts.js";

export const createJobApplication = async (req, res) => {
  const {
    user_id,
    job_title,
    application_date,
    notes,
    company_name,
    location,
    website,
    industry,
    contact_name,
    contact_role,
    contact_email,
    contact_phone,
    contact_notes,
  } = req.body;

  try {
    // Basic validation
    if (
      !user_id ||
      !job_title ||
      !application_date ||
      !company_name ||
      !contact_name
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Validate if the user exists
    const userExists = await Users.findOne({ where: { user_id } });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the primary ID where the status_name is "Applied"
    const status = await Statuses.findOne({
      where: { status_name: "Applied" },
    });
    if (!status) {
      return res.status(404).json({
        success: false,
        message: "Status 'Applied' not found",
      });
    }

    // Create the company record
    const newCompany = await Companies.create({
      company_name,
      location,
      website,
      industry,
    });

    // Create the job application record first to get the application_id
    const newApplication = await JobApplications.create({
      user_id,
      company_id: newCompany.company_id, // Use the ID from the newly created company
      job_title,
      status_id: status.status_id, // Use the found status ID
      application_date,
      notes,
    });

    // Create the contact record with the application_id
    const newContact = await Contacts.create({
      application_id: newApplication.application_id, // This will now be set correctly
      name: contact_name,
      role: contact_role,
      email: contact_email,
      phone: contact_phone,
      notes: contact_notes,
    });

    // Update the job application with the contact_id
    newApplication.contact_id = newContact.contact_id; // Set the contact_id
    await newApplication.save(); // Save the updated job application

    res.status(201).json({ success: true, data: newApplication });
  } catch (error) {
    console.error("Error details:", error); // Log error for debugging
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        error: error.errors.map((err) => err.message), // Detailed validation errors
      });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateJobApplicationCompanyByOnlyId = async (req, res) => {
  const { application_id } = req.params; // Get application ID from request parameters
  const { company_id } = req.body; // Get company ID from request body

  try {
    // Find the job application by ID
    const application = await JobApplications.findOne({
      where: { application_id },
    });
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    // Validate if the company exists
    const company = await Companies.findOne({ where: { company_id } });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Update the job application's company ID
    application.company_id = company_id;
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Error details:", error); // Log error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateJobApplicationCompanyByProvidingTheCompany = async (
  req,
  res
) => {
  const { application_id } = req.params; // Get application ID from request parameters
  const { company_name, location, website, industry } = req.body; // Get company data from request body

  try {
    // Find the job application by ID
    const application = await JobApplications.findOne({
      where: { application_id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    // Check if the company already exists
    let company = await Companies.findOne({ where: { company_name } });

    // If the company does not exist, create a new company
    if (!company) {
      company = await Companies.create({
        company_name,
        location,
        website,
        industry,
      });
    }

    // Update the job application's company ID
    application.company_id = company.company_id; // Use the existing or newly created company's ID
    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Error details:", error); // Log error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all job applications with pagination
export const getAllJobApplications = async (req, res) => {
  let { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided

  // Convert page and limit to integers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Validate page and limit values
  if (isNaN(page) || page < 1) {
    page = 1; // Default to page 1 if page is invalid
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10; // Default to 10 if limit is invalid
  }

  const offset = (page - 1) * limit;

  try {
    // Find job applications with pagination
    const applications = await JobApplications.findAndCountAll({
      where: { is_deleted: false },
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: applications.rows,
      totalItems: applications.count,
      totalPages: Math.ceil(applications.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a job application by ID
export const getJobApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await JobApplications.findOne({
      where: { application_id: id, is_deleted: false },
    });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Job application not found" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a job application
export const updateJobApplication = async (req, res) => {
  const { id } = req.params;
  const { company_id, job_title, status_id, application_date, notes } =
    req.body;

  try {
    const application = await JobApplications.findOne({
      where: { application_id: id, is_deleted: false },
    });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Job application not found" });
    }

    // Basic validation
    if (job_title) {
      application.job_title = job_title;
    }
    if (status_id) {
      application.status_id = status_id;
    }
    if (application_date) {
      application.application_date = application_date;
    }
    if (notes !== undefined) {
      application.notes = notes;
    }
    if (company_id) {
      application.company_id = company_id;
    }

    await application.save();

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete a job application
export const deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await JobApplications.findOne({
      where: { application_id: id, is_deleted: false },
    });

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Job application not found" });
    }

    application.is_deleted = true; // Mark as deleted
    await application.save();

    res
      .status(200)
      .json({ success: true, message: "Job application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
