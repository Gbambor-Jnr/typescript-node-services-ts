"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.AdminRoutes = router;
router.post("/login", controllers_1.createVandorLogin);
//router.use(Authenticate); //since the login doesnt  need this kind of authentication we do it belowthe routes that need it because once you login you can then gaccess the other routes
router.get("/profile", controllers_1.getVandorProfile);
router.patch("/profile", controllers_1.updateVandorProfile);
router.patch("/service", controllers_1.updateVandorService);
//# sourceMappingURL=AdminRoutes.js.map