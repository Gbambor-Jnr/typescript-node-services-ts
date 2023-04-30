import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { AuthPayload } from "../dtos/Auth.dto";

export const generateSalt = async () => {
  const gSalt = await bcrypt.genSalt();

  return gSalt;
};

export const generatePassword = async (password: string, salt: string) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const validateToken = async (req: Request) => {
  const token = req.get("Authorization");

  if (token) {
    const payload = (await jwt.verify(
      //this returns the values that were encoded when the jwt.sign was used to form a token
      token.split(" ")[1],
      APP_SECRET
    )) as AuthPayload;
    req.user = payload;
    //next();
    return true;
  }
  return false;
};

// export const validateToken = async (req: Request, res:Response, next:NextFunction) => {
//   const token = req.get("Authorization");

//   if (token) {
//     const payload = (await jwt.verify(
//       //this returns the values that were encoded when the jwt.sign was used to form a token
//       token.split(" ")[1],
//       APP_SECRET
//     )) as AuthPayload;
//     req.user = payload;
//     next();

//   }
//     return res.json({ message: "user not authenticated" });;
// }; this could be used here directly instead of creating Authenticate function in the middleware/Commonauth
