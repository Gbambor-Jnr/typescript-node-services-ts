import express, { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import {
  CreateCustomerInput,
  CustomerLoginInputs,
  EditCustomerProfileInputs,
} from "../dtos/Customer.dtos";
import { validate } from "class-validator";
import { Customer } from "../models/Customer";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { genSalt } from "bcrypt";
import {
  GenerateSignature,
  generatePassword,
  validatePassword,
  validateSignature,
} from "../utility/PasswordUtility";
import { generateOtp, onRequestOTP } from "../utility";
import { CustomerPayload } from "../dtos/Customer.dtos";

export const CustomerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CreateCustomerInput, req.body); //this is the same as <CreateVandorInput>req.body only that the plaintotext is doing the validation now for us
  const inputErrors = await validate(customerInputs, {
    validationError: { target: false },
  });

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }

  const { email, phone, password } = customerInputs;

  const existingCustomer = await Customer.find({ email: email });

  if (existingCustomer) {
    res.status(409).json("A user with this email already exixts");
  }

  const salt = await genSalt();
  const customerPassword = await generatePassword(password, salt);
  const { otp, otp_expiry } = generateOtp();

  const customer = new Customer({
    email,
    phone,
    password: customerPassword,
    salt,
    otp,
    otp_expiry,
    address: " ",
    lat: 0,
    long: 0,
  });

  if (customer) {
    //send OTP to customer
    await onRequestOTP(otp, phone);
    //generate signature

    const signature = await GenerateSignature({
      _id: customer._id,
      email: customer.email,
      verified: customer.verified,
    });
    //send result to client
    return res.status(201).json({
      signature: signature,
      verified: customer.verified,
      email: email,
    });
  }
  res.status(400).json({ message: "Error with signup" });
};

export const CustomerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginInputs = plainToClass(CustomerLoginInputs, req.body);

  const loginErrors = await validate(loginInputs, {
    validationError: { target: false },
  });

  if (loginErrors.length > 0) {
    res.status(400).json(loginErrors);
  }
  const { email, password } = loginInputs;

  const customer = await Customer.findOne({ email: email });

  if (customer) {
    const isEqual = await validatePassword(
      password,
      customer.password,
      customer.salt
    );
    if (isEqual) {
      const signature = await GenerateSignature({
        _id: customer._id,
        email: customer.email,
        verified: customer.verified,
      });
      return res.status(201).json({
        signature: signature,
        verified: customer.verified,
        email: customer.email,
      });
    }
  }
  res.status(404).json({ message: "Login Error" });
};

export const CustomerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    if (profile) {
      if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
        //we use parseInt incase the otp coming from the db is a string it ensures its a number
        //otp_expiry is stored as Date format too
        profile.verified = true;
        const updatedCustomerResponse = await profile.save();

        //generate Signature

        const signature = await GenerateSignature({
          _id: updatedCustomerResponse.id,
          email: updatedCustomerResponse.email,
          verified: updatedCustomerResponse.verified,
        });
        return res.status(201).json({
          signature: signature,
          verified: updatedCustomerResponse.verified,
          email: updatedCustomerResponse.email,
        });
      }
    }
  }
  return res.status(400).json({ message: "Error with OTP validation" });
};

export const RequestOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    const { otp, otp_expiry } = generateOtp();

    if (profile) {
      profile.otp = otp;
      profile.otp_expiry = otp_expiry;
      await onRequestOTP(otp, profile.phone);
    }

    return res
      .status(200)
      .json({ message: "OTP succesfully sent to your registered phone" });
  }
};

export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const profile = await Customer.findById(customer._id);

    return res.status(200).json(profile);
  }

  res.status(400).json("Error with fetching profile");
};

export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;
  const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);
  const profileErrors = await validate(profileInputs, {
    validationError: { target: false },
  });
  const { firstName, lastName, address } = profileInputs;
  if (profileErrors.length > 0) {
    res.status(400).json(profileErrors);
  }

  if (customer) {
    const profile = await Customer.findById(customer._id);

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.address = address;

      const result = await profile.save();

      res.status(200).json(result);
    }
    res.status(404).json("no customer found");
  }
};
