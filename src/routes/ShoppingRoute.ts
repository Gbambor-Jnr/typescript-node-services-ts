import express, { Request, Response, NextFunction } from "express";
import {
  GetFoodAvailability,
  GetFoodIn30Min,
  GetTopRestaurant,
  RestaurantById,
  SearchFood,
} from "../controllers/ShoppingController";

const router = express.Router();

/** _________________________FOOD AVAILABLITY_________________________ */
router.get("/:pincode", GetFoodAvailability);

/** _________________________Top Restaurant________________________ */
router.get("/top-restaurant/:pincode", GetTopRestaurant);

/** _________________________FOOD AVAILABLe in 30mins_________________________ */

router.get("/foods-in-30-min/:pincode", GetFoodIn30Min);

/** _________________________Search food_________________________ */

router.get("/search/:pincode", SearchFood);

/** _________________________FInd Restaurant by id_________________________ */
router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
