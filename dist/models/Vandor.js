"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const vandorModel = new mongoose_1.Schema({
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
    foods: [{ type: mongoose_1.default.SchemaTypes.ObjectId, ref: "foods" }],
}, {
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
});
const VandorModel = (0, mongoose_1.model)("vandor", vandorModel);
exports.VandorModel = VandorModel;
//# sourceMappingURL=Vandor.js.map