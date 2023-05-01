"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorLoginModel = void 0;
const mongoose_1 = require("mongoose");
const VandorLoginSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true,
});
exports.VandorLoginModel = (0, mongoose_1.model)("vandorLogin", VandorLoginSchema);
//# sourceMappingURL=VandorLogin.js.map