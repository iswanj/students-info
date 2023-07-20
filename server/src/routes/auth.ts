import express, { Request, Response, NextFunction } from "express";
import { create, login, logout, getUsers, verifyToken } from "../controllers/auth";

const router = express.Router();

// Register a new user
router.post("/register", create);
// User login
router.post("/login", login);
// User logout
router.post("/logout", verifyToken, logout);
// Get all users
router.get("/users", verifyToken, getUsers);

export default router;
