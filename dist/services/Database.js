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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const app = (0, express_1.default)();
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images"); //null means the function returns no problems and images means store at the images folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + " " + file.originalname);
//   },
// });
// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (
//     file.mimetype === "image.png" ||
//     file.mimetype === "image.jpeg" ||
//     file.mimetype === "image.jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// app.use(
//   multer({ storage: imageStorage, fileFilter: fileFilter }).array("images", 10)
// ); //instead of passing the multer into the food route, we can also pass it as a general one but since only the food section needs it, we can pass it directly there.
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.MONGO_URI);
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=Database.js.map