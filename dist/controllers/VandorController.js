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
exports.deleteVandor = exports.getVandorById = exports.getVandor = exports.createVandor = exports.findVandor = void 0;
const Vandor_1 = require("../models/Vandor");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const findVandor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    let seenVandor;
    if (email) {
        return yield Vandor_1.VandorModel.findOne({ email: email });
    }
    else {
        seenVandor = yield Vandor_1.VandorModel.findById(id);
    }
    return seenVandor;
});
exports.findVandor = findVandor;
const createVandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ownerName, foodType, pinCode, address, phone, email, password, } = req.body;
        //const existingVandor = await findVandor(email);
        const existingVandor = yield Vandor_1.VandorModel.findOne({ email: email });
        if (existingVandor) {
            res.status(200).json({ message: "this vandor already exists" });
        }
        //generate a salt
        const salt = yield (0, PasswordUtility_1.generateSalt)();
        const userPassword = yield (0, PasswordUtility_1.generatePassword)(password, salt);
        //encrypt the password
        const createdVandor = new Vandor_1.VandorModel({
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
        const savedVandor = yield createdVandor.save();
        res
            .status(201)
            .json({ message: "vandor created Succesful!!!", userInfo: savedVandor });
        // const createdVandor= await
    }
    catch (err) {
        next(err);
    }
});
exports.createVandor = createVandor;
const getVandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seenVandor = yield Vandor_1.VandorModel.find();
        res.status(200).json({ data: seenVandor });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getVandor = getVandor;
const getVandorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsId = req.params.id;
        if (!paramsId) {
            res.status(405).json({ message: "this id does not exist" });
        }
        const seenVandor = yield (0, exports.findVandor)(paramsId);
        res.status(200).json({ data: seenVandor });
    }
    catch (err) {
        next(err);
    }
});
exports.getVandorById = getVandorById;
const deleteVandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteVandor = deleteVandor;
//export { createVandor as VandorController };
//# sourceMappingURL=VandorController.js.map