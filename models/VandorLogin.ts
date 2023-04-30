import mongoose, { Schema, model, Document } from "mongoose";

interface VandorLoginDoc extends Document {
  email: string;
  password: string;
}

const VandorLoginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const VandorLoginModel = model<VandorLoginDoc>(
  "vandorLogin",
  VandorLoginSchema
);
