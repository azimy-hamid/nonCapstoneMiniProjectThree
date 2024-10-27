import Reminders from "../models/Reminders.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs

// Create a new reminder
export const createReminder = async (req, res) => {
  const { user_id, application_id, reminder_date, description, status } =
    req.body;

  try {
    // Basic validation
    if (!user_id || !application_id || !reminder_date || !status) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, application ID, reminder date, and status are required",
      });
    }

    const newReminder = await Reminders.create({
      reminder_id: uuidv4(),
      user_id,
      application_id,
      reminder_date,
      description,
      status,
    });

    res.status(201).json({ success: true, data: newReminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all reminders
export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminders.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: reminders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a reminder by ID
export const getReminderById = async (req, res) => {
  const { id } = req.params;

  try {
    const reminder = await Reminders.findOne({
      where: { reminder_id: id, is_deleted: false },
    });

    if (!reminder) {
      return res
        .status(404)
        .json({ success: false, message: "Reminder not found" });
    }

    res.status(200).json({ success: true, data: reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  const { id } = req.params;
  const { user_id, application_id, reminder_date, description, status } =
    req.body;

  try {
    const reminder = await Reminders.findOne({
      where: { reminder_id: id, is_deleted: false },
    });

    if (!reminder) {
      return res
        .status(404)
        .json({ success: false, message: "Reminder not found" });
    }

    // Basic validation
    if (user_id) {
      reminder.user_id = user_id;
    }
    if (application_id) {
      reminder.application_id = application_id;
    }
    if (reminder_date) {
      reminder.reminder_date = reminder_date;
    }
    if (description) {
      reminder.description = description;
    }
    if (status) {
      reminder.status = status;
    }

    await reminder.save();

    res.status(200).json({ success: true, data: reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete a reminder
export const deleteReminder = async (req, res) => {
  const { id } = req.params;

  try {
    const reminder = await Reminders.findOne({
      where: { reminder_id: id, is_deleted: false },
    });

    if (!reminder) {
      return res
        .status(404)
        .json({ success: false, message: "Reminder not found" });
    }

    reminder.is_deleted = true; // Mark as deleted
    await reminder.save();

    res
      .status(200)
      .json({ success: true, message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
