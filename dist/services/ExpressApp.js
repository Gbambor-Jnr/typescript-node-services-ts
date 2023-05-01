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
const routes_1 = require("../routes");
//import bodyParser from "body-parser"; duriing deployment instead of bodyparser.json we use express.json
const FoodRoutes_1 = require("../routes/FoodRoutes");
const path_1 = __importDefault(require("path"));
const routes_2 = require("../routes");
const routes_3 = require("../routes");
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("./images", express_1.default.static(path_1.default.join(__dirname, "images")));
    app.use(routes_1.AdminRoutes);
    app.use(routes_1.VandorRoutes);
    app.use(FoodRoutes_1.FoodRoute);
    app.use(routes_2.ShoppingRoute);
    app.use(routes_3.CustomerRoute);
    return app;
});
//when you use export default, in where ever you chose to import it, you cyn call it any name you like
//# sourceMappingURL=ExpressApp.js.map