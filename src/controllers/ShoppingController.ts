import express, { Request, Response, NextFunction } from "express";
import { VandorModel } from "../models/Vandor";
import { FooodDoc } from "../models/Food";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = <string>req.params.pincode;
  const result = await VandorModel.find({
    pincode,
    serviceAvailability: true,
  })
    .sort([["rating", "descending"]])
    .populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"

  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    return res.status(400).json({ message: "Data not found" });
  }
};

export const GetTopRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = <string>req.params.pincode;
  const result = await VandorModel.find({
    pincode,
    serviceAvailability: true,
  })
    .sort([["rating", "descending"]])
    .limit(1);

  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    return res.status(400).json({ message: "Data not found" });
  }
};

export const GetFoodIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = <string>req.params.pincode;
  const results = await VandorModel.find({
    pincode,
    serviceAvailability: true,
  })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (results.length > 0) {
    let foodResult: any = [];

    results.map((vandor) => {
      const foods = vandor.foods as [FooodDoc];
      foodResult.push(...foods.filter((food) => food.readyTime < 30));
    });
    res.status(200).json(foodResult);
  } else {
    return res.status(400).json({ message: "Data not found" });
  }
};

export const SearchFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = <string>req.params.pincode;
  const result = await VandorModel.find({
    pincode,
    serviceAvailability: true,
  }).populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"

  if (result.length > 0) {
    let foodResult: any = [];
    result.map((vandor) => {
      //const foods = vandor.foods as [FooodDoc];
      foodResult.push(...vandor.foods);
    });
    res.status(200).json(foodResult);
  } else {
    return res.status(400).json({ message: "Data not found" });
  }
};

export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const restaurantId = <string>req.params.id;
  const result = await VandorModel.findById(restaurantId).populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"

  if (result) {
    res.status(200).json(result);
  } else {
    return res.status(400).json({ message: "Data not found" });
  }
};
