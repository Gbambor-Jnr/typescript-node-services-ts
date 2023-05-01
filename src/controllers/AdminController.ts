import express, { Request, Response, NextFunction, Router } from "express";
//import { CreateVandorInput } from "../dtos/Vandor.dto";
import {
  EditedVandorInput,
  VandorLoginInputs,
  VandorPayLoad,
} from "../dtos/Vandor.dto";
//import { CreateVandorInput } from "../dtos/Vandor.dto";
import { VandorLoginModel } from "../models/VandorLogin";
import { VandorModel } from "../models/Vandor";
import { findVandor } from "./VandorController";
import { validatePassword } from "../utility/PasswordUtility";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-smtp-transport";
//import { SEND_GRID_KEY } from "../config";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: TRANS_USER,
//     pass: TRANS_PASS,
//   },
// });

export const createVandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await VandorModel.findOne({ email: email });

    if (existingVandor) {
      //validate
      console.log(existingVandor.salt);
      let token;
      //const { password, email } = <VandorLoginInputs>req.body;
      //const { salt, password } = existingVandor;
      const isEqual = await validatePassword(
        password,
        existingVandor.password,
        existingVandor.salt
      );
      if (isEqual) {
        token = jwt.sign(
          {
            email: email,
            name: existingVandor.name,
            foodType: existingVandor.foodType,
            _id: existingVandor._id,
          },
          APP_SECRET,
          { expiresIn: "100d" }
        );
      }
      //   const info = await transporter.sendMail({
      //     to: email,
      //     from: "okekeikennacornelius@gmail.com ",
      //     subject: "Signup completed",
      //     html: " <h1> You succesfully signed up </h1>",
      //   });
      return res.status(200).json({
        token: token,
        loadedUser: {
          user: existingVandor._id,
          name: existingVandor.name,
        },
      });
    }

    res.status(404).json({ message: "incorrect credentials" });
  } catch (err) {
    next(err);
  }
};

export const getVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = <VandorPayLoad>req.user;
  if (user) {
    const existingVandor = VandorModel.findById(user._id);
    return res.json({ data: existingVandor });
  }
  return res.json({ message: "Vandor info missing" });
};

export const updateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, foodType, phone, address } = <EditedVandorInput>req.body;
  const user = <VandorPayLoad>req.user;
  if (user) {
    const existingVandor = await VandorModel.findById(user._id);
    if (existingVandor) {
      existingVandor.name = name;
      existingVandor.phone = phone;
      existingVandor.address = address;
      existingVandor.foodType = foodType;
      const savedResult = await existingVandor.save();
    }

    return res.json({ data: existingVandor });
  }
  return res.json({ message: "Vandor info missing" });
};

export const updateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
