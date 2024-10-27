import Contacts from "../models/Contacts.js";
import { v4 as uuidv4 } from "uuid"; // Ensure to install this package for generating UUIDs

// Create a new contact
export const createContact = async (req, res) => {
  const { name, role, email, phone, notes } = req.body;

  try {
    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Application ID and name are required",
      });
    }

    const newContact = await Contacts.create({
      name,
      role: role || null,
      email: email || null,
      phone: phone || null,
      notes: notes || null,
    });

    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contacts.findAll({ where: { is_deleted: false } });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a contact by ID
export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contacts.findOne({
      where: { contact_id: id, is_deleted: false },
    });

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { application_id, name, role, email, phone, notes } = req.body;

  try {
    const contact = await Contacts.findOne({
      where: { contact_id: id, is_deleted: false },
    });

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    // Basic validation
    if (application_id) {
      contact.application_id = application_id;
    }
    if (name) {
      contact.name = name;
    }
    if (role) {
      contact.role = role;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }
    if (notes) {
      contact.notes = notes;
    }

    await contact.save();

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Soft delete a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contacts.findOne({
      where: { contact_id: id, is_deleted: false },
    });

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    contact.is_deleted = true; // Mark as deleted
    await contact.save();

    res
      .status(200)
      .json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
