import express from "express";
import {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
} from "../controllers/statusesControllers.js";

import authenticate from "../middlewares/authentication.js";

const statusesRoutes = express.Router();

// Create a new status
statusesRoutes.post("/create-status", authenticate, createStatus);

// Get all statuses
statusesRoutes.get("/get-all-statuses", authenticate, getAllStatuses);

// Get a status by ID
statusesRoutes.get("/get-status-by-id/:id", authenticate, getStatusById);

// Update a status
statusesRoutes.put("/update-status/:id", authenticate, updateStatus);

// Soft delete a status
statusesRoutes.delete("/delete-status/:id", authenticate, deleteStatus);

export default statusesRoutes;
