import Statuses from "../models/Statuses.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs

// Create a new status
export const createStatus = async (req, res) => {
  const { status_name } = req.body;

  try {
    // Basic validation
    if (!status_name) {
      return res
        .status(400)
        .json({ success: false, message: "Status name is required" });
    }

    const newStatus = await Statuses.create({
      status_id: uuidv4(),
      status_name,
    });

    res.status(201).json({ success: true, data: newStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all statuses
export const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Statuses.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: statuses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a status by ID
export const getStatusById = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await Statuses.findOne({
      where: { status_id: id, is_deleted: false },
    });

    if (!status) {
      return res
        .status(404)
        .json({ success: false, message: "Status not found" });
    }

    res.status(200).json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a status
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status_name } = req.body;

  try {
    const status = await Statuses.findOne({
      where: { status_id: id, is_deleted: false },
    });

    if (!status) {
      return res
        .status(404)
        .json({ success: false, message: "Status not found" });
    }

    // Update fields if provided
    if (status_name) {
      status.status_name = status_name;
    }

    await status.save();

    res.status(200).json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete a status
export const deleteStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await Statuses.findOne({
      where: { status_id: id, is_deleted: false },
    });

    if (!status) {
      return res
        .status(404)
        .json({ success: false, message: "Status not found" });
    }

    status.is_deleted = true; // Mark as deleted
    await status.save();

    res
      .status(200)
      .json({ success: true, message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
