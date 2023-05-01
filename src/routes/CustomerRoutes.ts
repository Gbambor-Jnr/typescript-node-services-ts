import express from "express";
import {
  CustomerLogin,
  CustomerSignup,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  RequestOtp,
} from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

//export const CustomerRoute = router;

/**_________SIGNUP/CREATE CUSTOMER */
router.post("/customer/signup", CustomerSignup);
/**_________login */
router.post("/customer-login", CustomerLogin);

//router.use(Authenticate);
/**_________Verify customer account */
router.patch("/verify", CustomerVerify);
/**_________OTP/REQUESTING OTP*/
router.get("/otp", RequestOtp);

/**_________Profile */
router.get("/profile", GetCustomerProfile);

router.patch("/profile", EditCustomerProfile);

export { router as CustomerRoute };
