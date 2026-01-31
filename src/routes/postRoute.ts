import express from "express";
import postController from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", postController.getAll.bind(postController));

router.get("/:id", postController.getById.bind(postController));

router.post("/", authenticate, postController.create.bind(postController));

router.delete("/:id", authenticate, postController.del.bind(postController));

router.put("/:id", authenticate, postController.update.bind(postController));

export default router;
