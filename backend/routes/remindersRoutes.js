import express from "express";
import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../controllers/remindersControllers.js";

import authenticate from "../middlewares/authentication.js";

const remindersRoutes = express.Router();

// Create a new reminder
remindersRoutes.post("/create-reminder", authenticate, createReminder);

// Get all reminders
remindersRoutes.get("/get-all-reminders", authenticate, getAllReminders);

// Get a reminder by ID
remindersRoutes.get("/get-reminder-by-id/:id", authenticate, getReminderById);

// Update a reminder
remindersRoutes.put("/update-reminder/:id", authenticate, updateReminder);

// Soft delete a reminder
remindersRoutes.delete("delete-reminder/:id", authenticate, deleteReminder);

export default remindersRoutes;
