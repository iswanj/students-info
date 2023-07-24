import express, { Request, Response, NextFunction } from "express";
import { create, login, logout, getUsers, verifyToken } from "../controllers/auth";
import {
  getExamResults,
  getResults,
  getSubjects,
  getGradeDistribution,
  getPassedCount,
} from "../controllers/exam";

const router = express.Router();

// get all results
router.get("/getExams", verifyToken, getExamResults);
router.get("/getResults", verifyToken, getResults);
router.get("/getSubjects", verifyToken, getSubjects);
router.get("/getGradeDistribution", verifyToken, getGradeDistribution);
router.get("/getPassedCount", verifyToken, getPassedCount);

export default router;
