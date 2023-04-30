import express, { Request, application } from "express";
import { AdminRoutes, VandorRoutes } from "./routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import { FoodRoute } from "./routes/FoodRoutes";
import multer from "multer";
import path from "path";
import { FileFilterCallback } from "multer";

const app = express();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //null means the function returns no problems and images means store at the images folder
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + " " + file.originalname);
  },
});
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("./images", express.static(path.join(__dirname, "images")));
app.use(AdminRoutes);
app.use(VandorRoutes);

app.use(FoodRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(9080);
    console.log("app is connected");
  })
  .catch((err) => console.error(err.message));
