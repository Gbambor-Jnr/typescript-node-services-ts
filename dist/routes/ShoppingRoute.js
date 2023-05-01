"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const ShoppingController_1 = require("../controllers/ShoppingController");
const router = express_1.default.Router();
exports.ShoppingRoute = router;
/** _________________________FOOD AVAILABLITY_________________________ */
router.get("/:pincode", ShoppingController_1.GetFoodAvailability);
/** _________________________Top Restaurant________________________ */
router.get("/top-restaurant/:pincode", ShoppingController_1.GetTopRestaurant);
/** _________________________FOOD AVAILABLe in 30mins_________________________ */
router.get("/foods-in-30-min/:pincode", ShoppingController_1.GetFoodIn30Min);
/** _________________________Search food_________________________ */
router.get("/search/:pincode", ShoppingController_1.SearchFood);
/** _________________________FInd Restaurant by id_________________________ */
router.get("/restaurant/:id", ShoppingController_1.RestaurantById);
//# sourceMappingURL=ShoppingRoute.js.map