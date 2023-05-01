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
exports.GetFood = exports.AddFood = void 0;
const Food_1 = require("../models/Food");
const Vandor_1 = require("../models/Vandor");
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVandor = yield Vandor_1.VandorModel.findById(user._id);
        const { name, description, category, foodType, readyTime, price } = req.body;
        if (existingVandor) {
            const files = req.files; //files going to have a lot of things like filename, originalmname, path etc inside  an array
            const imageNames = files.map((file) => file.filename); //returns an array of filename from the files array because remember we are storing the images in array
            const createdFood = new Food_1.foodModel({
                vandorId: existingVandor._id,
                name,
                description,
                category,
                foodType: ["Beans", "rice"],
                readyTime,
                price,
                images: imageNames,
                rating: 0,
            });
            existingVandor.foods.push(createdFood);
            const result = yield existingVandor.save();
            return res.status(201).json(result);
        }
    }
});
exports.AddFood = AddFood;
const GetFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        console.log("user found");
        const foods = yield Food_1.foodModel.find({ vandorId: user._id });
        if (foods) {
            return res.status(200).json({ foods });
        }
        return res.json({ message: "No User information" });
    }
    return res.json({ message: "No Food information" });
});
exports.GetFood = GetFood;
//# sourceMappingURL=FoodController.js.map