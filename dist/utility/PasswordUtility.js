"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignature = exports.GenerateSignature = exports.validatePassword = exports.generatePassword = exports.generateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const generateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    const gSalt = yield bcrypt_1.default.genSalt();
    return gSalt;
});
exports.generateSalt = generateSalt;
const generatePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.hash(password, salt);
});
exports.generatePassword = generatePassword;
const validatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.generatePassword)(enteredPassword, salt)) === savedPassword;
});
exports.validatePassword = validatePassword;
const GenerateSignature = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, config_1.APP_SECRET, { expiresIn: "90d" });
});
exports.GenerateSignature = GenerateSignature;
const validateSignature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("Authorization");
    if (token) {
        const payload = (yield jsonwebtoken_1.default.verify(
        //this returns the values that were encoded when the jwt.sign was used to form a token
        token.split(" ")[1], config_1.APP_SECRET));
        req.user = payload;
        //next();
        return true;
    }
    return false;
});
exports.validateSignature = validateSignature;
// export const validateToken = async (req: Request, res:Response, next:NextFunction) => {
//   const token = req.get("Authorization");
//   if (token) {
//     const payload = (await jwt.verify(
//       //this returns the values that were encoded when the jwt.sign was used to form a token
//       token.split(" ")[1],
//       APP_SECRET
//     )) as AuthPayload;
//     req.user = payload;
//     next();
//   }
//     return res.json({ message: "user not authenticated" });;
// }; this could be used here directly instead of creating Authenticate function in the middleware/Commonauth
//# sourceMappingURL=PasswordUtility.js.map