import express, { Router, Request } from "express";
import { AddFood, GetFood } from "../controllers/FoodController";
import multer, { FileFilterCallback } from "multer";
const router = Router();

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); //null means the function returns no problems and images means store at the images folder
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + " " + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const images = multer({ storage: imageStorage, fileFilter: fileFilter }).array(
  "images",
  10
); //this means to tell  multer that we expect a maximum of 10 images
//const images = multer({ storage: imageStorage }).single("images"); //thius tells multer that we expect only a single image

router.post("/foods", images, AddFood);
router.get("/foods", GetFood);

export { router as FoodRoute };
