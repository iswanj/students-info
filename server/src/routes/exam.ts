import express, { Request, Response, NextFunction } from "express";
import { create, login, logout, getUsers, verifyToken } from "../controllers/auth";
import { getExamResults } from "../controllers/exam";

const router = express.Router();

// get all results
router.get("/getResults", verifyToken, getExamResults);

export default router;
