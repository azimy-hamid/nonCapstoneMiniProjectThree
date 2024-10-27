import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../controllers/contactsControllers.js";

import authenticate from "../middlewares/authentication.js";

const contactsRoutes = express.Router();

// Create a new contact
contactsRoutes.post("/create-contact", authenticate, createContact);

// Get all contacts
contactsRoutes.get("/get-all-contacts", authenticate, getAllContacts);

// Get a contact by ID
contactsRoutes.get("/get-contact-by-id/:id", authenticate, getContactById);

// Update a contact
contactsRoutes.put("/update-contact/:id", authenticate, updateContact);

// Soft delete a contact
contactsRoutes.delete("/delete-contact/:id", authenticate, deleteContact);

export default contactsRoutes;
