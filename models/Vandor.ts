import mongoose, { Schema, model, Document } from "mongoose";

interface VandorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: string[];
  pinCode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailability: boolean;
  coverImages: string[];
  rating: number;
  foods: any;
}

const vandorModel = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailability: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "foods" }],
  },
  {
    toJSON: {
      //this means when this information is outputed during a get method in the res.status().json(), the following fields password, salt,__v, createdAt and updatedAt should not be displayed
      transform(doc, ret) {
        // delete ret.password,
        delete ret.__v,
          //delete ret.salt,
          delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const VandorModel = model<VandorDoc>("vandor", vandorModel);

export { VandorModel };
