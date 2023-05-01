import express, { Application } from "express";
import { AdminRoutes, VandorRoutes } from "../routes";
//import bodyParser from "body-parser"; duriing deployment instead of bodyparser.json we use express.json
import { FoodRoute } from "../routes/FoodRoutes";
import multer from "multer";
import path from "path";
import { FileFilterCallback } from "multer";
import { ShoppingRoute } from "../routes";
import { CustomerRoute } from "../routes";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("./images", express.static(path.join(__dirname, "images")));
  app.use(AdminRoutes);
  app.use(VandorRoutes);
  app.use(FoodRoute);
  app.use(ShoppingRoute);
  app.use(CustomerRoute);

  return app;
};

//when you use export default, in where ever you chose to import it, you cyn call it any name you like
