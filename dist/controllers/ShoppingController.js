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
exports.RestaurantById = exports.SearchFood = exports.GetFoodIn30Min = exports.GetTopRestaurant = exports.GetFoodAvailability = void 0;
const Vandor_1 = require("../models/Vandor");
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield Vandor_1.VandorModel.find({
        pincode,
        serviceAvailability: true,
    })
        .sort([["rating", "descending"]])
        .populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"
    if (result.length > 0) {
        res.status(200).json(result);
    }
    else {
        return res.status(400).json({ message: "Data not found" });
    }
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield Vandor_1.VandorModel.find({
        pincode,
        serviceAvailability: true,
    })
        .sort([["rating", "descending"]])
        .limit(1);
    if (result.length > 0) {
        res.status(200).json(result);
    }
    else {
        return res.status(400).json({ message: "Data not found" });
    }
});
exports.GetTopRestaurant = GetTopRestaurant;
const GetFoodIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const results = yield Vandor_1.VandorModel.find({
        pincode,
        serviceAvailability: true,
    })
        .sort([["rating", "descending"]])
        .populate("foods");
    if (results.length > 0) {
        let foodResult = [];
        results.map((vandor) => {
            const foods = vandor.foods;
            foodResult.push(...foods.filter((food) => food.readyTime < 30));
        });
        res.status(200).json(foodResult);
    }
    else {
        return res.status(400).json({ message: "Data not found" });
    }
});
exports.GetFoodIn30Min = GetFoodIn30Min;
const SearchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield Vandor_1.VandorModel.find({
        pincode,
        serviceAvailability: true,
    }).populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"
    if (result.length > 0) {
        let foodResult = [];
        result.map((vandor) => {
            //const foods = vandor.foods as [FooodDoc];
            foodResult.push(...vandor.foods);
        });
        res.status(200).json(foodResult);
    }
    else {
        return res.status(400).json({ message: "Data not found" });
    }
});
exports.SearchFood = SearchFood;
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantId = req.params.id;
    const result = yield Vandor_1.VandorModel.findById(restaurantId).populate("foods"); //populate is used to add and return the foods as the main returned filed of the "result"
    if (result) {
        res.status(200).json(result);
    }
    else {
        return res.status(400).json({ message: "Data not found" });
    }
});
exports.RestaurantById = RestaurantById;
//# sourceMappingURL=ShoppingController.js.map