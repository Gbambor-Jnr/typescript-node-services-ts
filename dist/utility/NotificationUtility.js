"use strict";
//Email
//notification
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.generateOtp = void 0;
const config_1 = require("../config");
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 98500);
    let otp_expiry = new Date();
    otp_expiry.setTime(new Date().getTime() + 30 * 60 * 1000); //new Date() returns the date of rightnow, new Date().getTime returns the date of right now in millisconds + (30*60*1000) adds extra 30 minutes to it i.e 30 * 60seconds * 1000 miiliseconds to convert 30 minutes to milliseconds
    return { otp, otp_expiry };
};
exports.generateOtp = generateOtp;
const onRequestOTP = (otp, toPhone) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = config_1.TWILO_SID;
    const authToken = config_1.TWILO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const response = yield client.messages.create({
        body: `Your OTP is ${otp}`,
        from: config_1.TWILO_PHONE,
        to: toPhone,
        // to:+49`${toPhone}`
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
//# sourceMappingURL=NotificationUtility.js.map