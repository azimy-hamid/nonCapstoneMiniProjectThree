import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactsControllers.js";

const contactsRoutes = express.Router();

// Create a new contact
contactsRoutes.post("/create-contact", createContact);

// Get all contacts
contactsRoutes.get("/get-all-contacts", getAllContacts);

// Get a contact by ID
contactsRoutes.get("/get-contact-by-id/:id", getContactById);

// Update a contact
contactsRoutes.put("/update-contact/:id", updateContact);

// Soft delete a contact
contactsRoutes.delete("/delete-contact/:id", deleteContact);

export default contactsRoutes;
