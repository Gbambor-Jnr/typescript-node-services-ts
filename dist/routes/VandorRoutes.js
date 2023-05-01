"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../controllers/index");
const router = (0, express_1.Router)();
exports.VandorRoutes = router;
router.post("/vandors", index_1.createVandor);
router.get("/vandors", index_1.getVandor);
router.get("/vandors/:id", index_1.getVandorById);
router.delete("/vandors", index_1.deleteVandor);
//# sourceMappingURL=VandorRoutes.js.map