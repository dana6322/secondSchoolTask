import express from "express";
import commentController from "../controllers/commentController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", commentController.getAll.bind(commentController));

router.get("/:id", commentController.getById.bind(commentController));

router.post(
  "/",
  authenticate,
  commentController.create.bind(commentController),
);

router.delete(
  "/:id",
  authenticate,
  commentController.del.bind(commentController),
);

router.put(
  "/:id",
  authenticate,
  commentController.update.bind(commentController),
);

export default router;
