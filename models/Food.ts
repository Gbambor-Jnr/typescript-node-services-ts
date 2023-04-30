import mongoose, { model, Schema, Document } from "mongoose";
import { createFoodInput } from "../dtos/Food.dto";

interface FooodDoc extends Document {
  vandorId: string;
  name: string;
  category: string;
  foodType: [string];
  price: number;
  readyTime: number;
  description: string;
  rating: number;
  images: [string];
}

const foodSchema = new Schema(
  {
    vandorId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    foodType: { type: [String], required: true },
    price: { type: Number, required: true },
    readyTime: { type: Number, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const foodModel = model<FooodDoc>("foods", foodSchema);
