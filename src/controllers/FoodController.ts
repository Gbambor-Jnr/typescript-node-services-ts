import { Request, Response, NextFunction } from "express";
import { foodModel } from "../models/Food";
import { createFoodInput } from "../dtos/Food.dto";
import { VandorModel } from "../models/Vandor";
import { FoodRoute } from "../routes/FoodRoutes";

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVandor = await VandorModel.findById(user._id);
    const { name, description, category, foodType, readyTime, price } = <
      createFoodInput
    >req.body;
    if (existingVandor) {
      const files = req.files as [Express.Multer.File]; //files going to have a lot of things like filename, originalmname, path etc inside  an array
      const imageNames = files.map(
        (file: Express.Multer.File) => file.filename
      ); //returns an array of filename from the files array because remember we are storing the images in array

      const createdFood = new foodModel({
        vandorId: existingVandor._id,
        name,
        description,
        category,
        foodType: ["Beans", "rice"],
        readyTime,
        price,
        images: imageNames,
        rating: 0,
      });
      existingVandor.foods.push(createdFood);
      const result = await existingVandor.save();

      return res.status(201).json(result);
    }
  }
};

export const GetFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    console.log("user found");
    const foods = await foodModel.find({ vandorId: user._id });

    if (foods) {
      return res.status(200).json({ foods });
    }
    return res.json({ message: "No User information" });
  }

  return res.json({ message: "No Food information" });
};
