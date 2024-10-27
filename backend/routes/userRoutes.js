import express from "express";
import {
  signUpUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  recoverPassword,
  resetPassword,
} from "../controllers/usersControllers.js";

const userRoutes = express.Router();

// Sign up a new user
userRoutes.post("/signup", signUpUser);

// Log in a user
userRoutes.post("/login", loginUser);

// Get all users
userRoutes.get("/get-all-users", getAllUsers);

// Get a user by ID
userRoutes.get("/get-user-by-id/:id", getUserById);

// Update user information
userRoutes.put("/update-user/:id", updateUser);

// Soft delete a user
userRoutes.delete("/delete-user/:id", deleteUser);

// Send password reset link
userRoutes.post("/recover-password", recoverPassword);

// Reset password
userRoutes.post("/reset-password", resetPassword);

export default userRoutes;
