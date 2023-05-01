//Email
//notification

import { TWILO_AUTH_TOKEN, TWILO_PHONE, TWILO_SID } from "../config";

export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 98500);
  let otp_expiry = new Date();

  otp_expiry.setTime(new Date().getTime() + 30 * 60 * 1000); //new Date() returns the date of rightnow, new Date().getTime returns the date of right now in millisconds + (30*60*1000) adds extra 30 minutes to it i.e 30 * 60seconds * 1000 miiliseconds to convert 30 minutes to milliseconds

  return { otp, otp_expiry };
};

export const onRequestOTP = async (otp: number, toPhone: string) => {
  const accountSid = TWILO_SID;
  const authToken = TWILO_AUTH_TOKEN;

  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: TWILO_PHONE,
    to: toPhone,
    // to:+49`${toPhone}`
  });

  return response;
};
