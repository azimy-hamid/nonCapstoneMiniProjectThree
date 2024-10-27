import express from "express";
import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../controllers/remindersControllers.js";

const remindersRoutes = express.Router();

// Create a new reminder
remindersRoutes.post("/create-reminder", createReminder);

// Get all reminders
remindersRoutes.get("/get-all-reminders", getAllReminders);

// Get a reminder by ID
remindersRoutes.get("/get-reminder-by-id/:id", getReminderById);

// Update a reminder
remindersRoutes.put("/update-reminder/:id", updateReminder);

// Soft delete a reminder
remindersRoutes.delete("delete-reminder/:id", deleteReminder);

export default remindersRoutes;
