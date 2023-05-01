import mongoose, { Schema, model, Document } from "mongoose";

interface CustomerDoc extends Document {
  phone: string;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
  address: string;
}

const customerModel = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    verified: {
      type: Boolean,
      required: true,
    },
    addrress: { type: String, required: true },
    otp: { type: Number, required: true },
    otp_expiry: { type: Date, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

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

const Customer = model<CustomerDoc>("customer", customerModel);

export { Customer };
