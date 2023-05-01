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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVandorService = exports.updateVandorProfile = exports.getVandorProfile = exports.createVandorLogin = void 0;
const Vandor_1 = require("../models/Vandor");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
//import { SEND_GRID_KEY } from "../config";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: TRANS_USER,
//     pass: TRANS_PASS,
//   },
// });
const createVandorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingVandor = yield Vandor_1.VandorModel.findOne({ email: email });
        if (existingVandor) {
            //validate
            console.log(existingVandor.salt);
            let token;
            //const { password, email } = <VandorLoginInputs>req.body;
            //const { salt, password } = existingVandor;
            const isEqual = yield (0, PasswordUtility_1.validatePassword)(password, existingVandor.password, existingVandor.salt);
            if (isEqual) {
                token = jsonwebtoken_1.default.sign({
                    email: email,
                    name: existingVandor.name,
                    foodType: existingVandor.foodType,
                    _id: existingVandor._id,
                }, config_1.APP_SECRET, { expiresIn: "100d" });
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
    }
    catch (err) {
        next(err);
    }
});
exports.createVandorLogin = createVandorLogin;
const getVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVandor = Vandor_1.VandorModel.findById(user._id);
        return res.json({ data: existingVandor });
    }
    return res.json({ message: "Vandor info missing" });
});
exports.getVandorProfile = getVandorProfile;
const updateVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, foodType, phone, address } = req.body;
    const user = req.user;
    if (user) {
        const existingVandor = yield Vandor_1.VandorModel.findById(user._id);
        if (existingVandor) {
            existingVandor.name = name;
            existingVandor.phone = phone;
            existingVandor.address = address;
            existingVandor.foodType = foodType;
            const savedResult = yield existingVandor.save();
        }
        return res.json({ data: existingVandor });
    }
    return res.json({ message: "Vandor info missing" });
});
exports.updateVandorProfile = updateVandorProfile;
const updateVandorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateVandorService = updateVandorService;
//# sourceMappingURL=AdminController.js.map