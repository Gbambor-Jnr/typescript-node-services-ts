"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRoute = void 0;
const express_1 = require("express");
const FoodController_1 = require("../controllers/FoodController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
exports.FoodRoute = router;
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); //null means the function returns no problems and images means store at the images folder
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + " " + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const images = (0, multer_1.default)({ storage: imageStorage, fileFilter: fileFilter }).array("images", 10); //this means to tell  multer that we expect a maximum of 10 images
//const images = multer({ storage: imageStorage }).single("images"); //thius tells multer that we expect only a single image
router.post("/foods", images, FoodController_1.AddFood);
router.get("/foods", FoodController_1.GetFood);
//# sourceMappingURL=FoodRoutes.js.map