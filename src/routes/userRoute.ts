import express from "express";
import userController from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", userController.getAll.bind(userController));

router.get("/:id", userController.getById.bind(userController));

router.post("/", authenticate, userController.create.bind(userController));

router.delete("/:id", authenticate, userController.del.bind(userController));

router.put("/:id", authenticate, userController.update.bind(userController));

export default router;
