"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const FoodRoutes_1 = require("./routes/FoodRoutes");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); //null means the function returns no problems and images means store at the images folder
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + " " + file.originalname);
    },
});
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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("./images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use(routes_1.AdminRoutes);
app.use(routes_1.VandorRoutes);
app.use(FoodRoutes_1.FoodRoute);
mongoose_1.default
    .connect(config_1.MONGO_URI)
    .then(() => {
    app.listen(9080);
    console.log("app is connected");
})
    .catch((err) => console.error(err.message));
//# sourceMappingURL=deprecatedIndex.js.map