import { AuthPayload } from "../dtos/Auth.dto";
import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utility/PasswordUtility";

declare global {
  //the declare global statement is used to define global variables or types that can be accessed from anywhere in your codebase
  namespace Express {
    //defining a namespace for the Express global object.
    interface Request {
      //It is adding a new property to the Request interface, which is a built-in interface provided by the Express library
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateToken(req);

  if (validate) {
    next();
  } else {
    return res.json({ message: "user not authenticated" });
  }
};
