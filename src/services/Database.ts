import express, { Request, application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "../config";
import multer from "multer";
import path from "path";
import { FileFilterCallback } from "multer";
import App from "./ExpressApp";

const app = express();

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images"); //null means the function returns no problems and images means store at the images folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + " " + file.originalname);
//   },
// });
// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (
//     file.mimetype === "image.png" ||
//     file.mimetype === "image.jpeg" ||
//     file.mimetype === "image.jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(
//   multer({ storage: imageStorage, fileFilter: fileFilter }).array("images", 10)
// ); //instead of passing the multer into the food route, we can also pass it as a general one but since only the food section needs it, we can pass it directly there.

export default async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};
