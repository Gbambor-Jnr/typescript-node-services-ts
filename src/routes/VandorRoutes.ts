import express, { Request, Response, NextFunction, Router } from "express";
import {
  createVandor,
  deleteVandor,
  getVandor,
  getVandorById,
} from "../controllers/index";

const router = Router();

router.post("/vandors", createVandor);
router.get("/vandors", getVandor);
router.get("/vandors/:id", getVandorById);
router.delete("/vandors", deleteVandor);

export { router as VandorRoutes };
