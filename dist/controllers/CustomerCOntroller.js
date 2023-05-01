"use strict";
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
exports.EditCustomerProfile = exports.GetCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerSignup = void 0;
const class_transformer_1 = require("class-transformer");
const Customer_dtos_1 = require("../dtos/Customer.dtos");
const class_validator_1 = require("class-validator");
const Customer_1 = require("../models/Customer");
const bcrypt_1 = require("bcrypt");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const utility_1 = require("../utility");
const CustomerSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dtos_1.CreateCustomerInput, req.body); //this is the same as <CreateVandorInput>req.body only that the plaintotext is doing the validation now for us
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: false },
    });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const existingCustomer = yield Customer_1.Customer.find({ email: email });
    if (existingCustomer) {
        res.status(409).json("A user with this email already exixts");
    }
    const salt = yield (0, bcrypt_1.genSalt)();
    const customerPassword = yield (0, PasswordUtility_1.generatePassword)(password, salt);
    const { otp, otp_expiry } = (0, utility_1.generateOtp)();
    const customer = new Customer_1.Customer({
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
        yield (0, utility_1.onRequestOTP)(otp, phone);
        //generate signature
        const signature = yield (0, PasswordUtility_1.GenerateSignature)({
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
});
exports.CustomerSignup = CustomerSignup;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInputs = (0, class_transformer_1.plainToClass)(Customer_dtos_1.CustomerLoginInputs, req.body);
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs, {
        validationError: { target: false },
    });
    if (loginErrors.length > 0) {
        res.status(400).json(loginErrors);
    }
    const { email, password } = loginInputs;
    const customer = yield Customer_1.Customer.findOne({ email: email });
    if (customer) {
        const isEqual = yield (0, PasswordUtility_1.validatePassword)(password, customer.password, customer.salt);
        if (isEqual) {
            const signature = yield (0, PasswordUtility_1.GenerateSignature)({
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
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                //we use parseInt incase the otp coming from the db is a string it ensures its a number
                //otp_expiry is stored as Date format too
                profile.verified = true;
                const updatedCustomerResponse = yield profile.save();
                //generate Signature
                const signature = yield (0, PasswordUtility_1.GenerateSignature)({
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
});
exports.CustomerVerify = CustomerVerify;
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        const { otp, otp_expiry } = (0, utility_1.generateOtp)();
        if (profile) {
            profile.otp = otp;
            profile.otp_expiry = otp_expiry;
            yield (0, utility_1.onRequestOTP)(otp, profile.phone);
        }
        return res
            .status(200)
            .json({ message: "OTP succesfully sent to your registered phone" });
    }
});
exports.RequestOtp = RequestOtp;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        return res.status(200).json(profile);
    }
    res.status(400).json("Error with fetching profile");
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(Customer_dtos_1.EditCustomerProfileInputs, req.body);
    const profileErrors = yield (0, class_validator_1.validate)(profileInputs, {
        validationError: { target: false },
    });
    const { firstName, lastName, address } = profileInputs;
    if (profileErrors.length > 0) {
        res.status(400).json(profileErrors);
    }
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const result = yield profile.save();
            res.status(200).json(result);
        }
        res.status(404).json("no customer found");
    }
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=CustomerCOntroller.js.map