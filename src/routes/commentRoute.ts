import express from "express";
import commentController from "../controllers/commentController";

const router = express.Router();

router.get("/", commentController.getAll.bind(commentController));

router.get("/:id", commentController.getById.bind(commentController));

router.post("/", commentController.create.bind(commentController));

router.delete("/:id", commentController.del.bind(commentController));

router.put("/:id", commentController.update.bind(commentController));

export default router;
