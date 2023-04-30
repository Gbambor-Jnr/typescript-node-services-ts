import express, { Application } from "express";
import { AdminRoutes, VandorRoutes } from "../routes";
import bodyParser from "body-parser";
import { FoodRoute } from "../routes/FoodRoutes";
import multer from "multer";
import path from "path";
import { FileFilterCallback } from "multer";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("./images", express.static(path.join(__dirname, "images")));
  app.use(AdminRoutes);
  app.use(VandorRoutes);
  app.use(FoodRoute);

  return app;
};

//when you use export default, in where ever you chose to import it, you cyn call it any name you like
