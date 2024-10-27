import express from "express";
import {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
} from "../controllers/statusesControllers.js";

const statusesRoutes = express.Router();

// Create a new status
statusesRoutes.post("/create-status", createStatus);

// Get all statuses
statusesRoutes.get("/get-all-statuses", getAllStatuses);

// Get a status by ID
statusesRoutes.get("/get-status-by-id/:id", getStatusById);

// Update a status
statusesRoutes.put("/update-status/:id", updateStatus);

// Soft delete a status
statusesRoutes.delete("/delete-status/:id", deleteStatus);

export default statusesRoutes;
