"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", commentController_1.default.getAll.bind(commentController_1.default));
router.get("/:id", commentController_1.default.getById.bind(commentController_1.default));
router.post("/", authMiddleware_1.authenticate, commentController_1.default.create.bind(commentController_1.default));
router.delete("/:id", authMiddleware_1.authenticate, commentController_1.default.del.bind(commentController_1.default));
router.put("/:id", authMiddleware_1.authenticate, commentController_1.default.update.bind(commentController_1.default));
exports.default = router;
//# sourceMappingURL=commentRoute.js.map