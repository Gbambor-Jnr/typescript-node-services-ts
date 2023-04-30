import express, { Request, Response, NextFunction, Router } from "express";
import {
  createVandorLogin,
  getVandorProfile,
  updateVandorProfile,
  updateVandorService,
} from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";

const router = Router();

router.post("/login", createVandorLogin);

router.use(Authenticate); //since the login doesnt  need this kind of authentication we do it belowthe routes that need it because once you login you can then gaccess the other routes

router.get("/profile", getVandorProfile);
router.patch("/profile", updateVandorProfile);
router.patch("/service", updateVandorService);

export { router as AdminRoutes };
