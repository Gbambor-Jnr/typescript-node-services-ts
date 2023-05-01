import express, { Request, Response, NextFunction, Router } from "express";
import { CreateVandorInput } from "../dtos/Vandor.dto";
import { VandorModel } from "../models/Vandor";
import bcrypt from "bcrypt";
import { generatePassword, generateSalt } from "../utility/PasswordUtility";

export const findVandor = async (id: string | undefined, email?: string) => {
  let seenVandor;
  if (email) {
    return await VandorModel.findOne({ email: email });
  } else {
    seenVandor = await VandorModel.findById(id);
  }

  return seenVandor;
};

export const createVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      ownerName,
      foodType,
      pinCode,
      address,
      phone,
      email,
      password,
    } = <CreateVandorInput>req.body;
    //const existingVandor = await findVandor(email);
    const existingVandor = await VandorModel.findOne({ email: email });
    if (existingVandor) {
      res.status(200).json({ message: "this vandor already exists" });
    }

    //generate a salt
    const salt = await generateSalt();
    const userPassword = await generatePassword(password, salt);
    //encrypt the password

    const createdVandor = new VandorModel({
      name,
      ownerName,
      foodType,
      pinCode,
      address,
      phone,
      email,
      password: userPassword,
      salt: salt,
      serviceAvailability: true,
      coverImages: [],
      rating: 1,
      foods: [],
    });
    const savedVandor = await createdVandor.save();
    res
      .status(201)
      .json({ message: "vandor created Succesful!!!", userInfo: savedVandor });
    // const createdVandor= await
  } catch (err) {
    next(err);
  }
};

export const getVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const seenVandor = await VandorModel.find();

    res.status(200).json({ data: seenVandor });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsId = req.params.id;
    if (!paramsId) {
      res.status(405).json({ message: "this id does not exist" });
    }
    const seenVandor = await findVandor(paramsId);

    res.status(200).json({ data: seenVandor });
  } catch (err) {
    next(err);
  }
};

export const deleteVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

//export { createVandor as VandorController };
