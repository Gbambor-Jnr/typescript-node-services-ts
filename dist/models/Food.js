"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodModel = void 0;
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    vandorId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    foodType: { type: [String], required: true },
    price: { type: Number, required: true },
    readyTime: { type: Number, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, required: true },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
    timestamps: true,
});
exports.foodModel = (0, mongoose_1.model)("foods", foodSchema);
//# sourceMappingURL=Food.js.map