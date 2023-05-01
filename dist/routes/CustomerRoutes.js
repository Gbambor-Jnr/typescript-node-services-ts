"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.CustomerRoute = router;
//export const CustomerRoute = router;
/**_________SIGNUP/CREATE CUSTOMER */
router.post("/customer/signup", controllers_1.CustomerSignup);
/**_________login */
router.post("/customer-login", controllers_1.CustomerLogin);
//router.use(Authenticate);
/**_________Verify customer account */
router.patch("/verify", controllers_1.CustomerVerify);
/**_________OTP/REQUESTING OTP*/
router.get("/otp", controllers_1.RequestOtp);
/**_________Profile */
router.get("/profile", controllers_1.GetCustomerProfile);
router.patch("/profile", controllers_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoutes.js.map