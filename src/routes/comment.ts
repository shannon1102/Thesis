import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import commentController from "../modules/comment/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/comments", asyncMiddleware(commentController.createComment));
router.put("/comments/:id", asyncMiddleware(commentController.getCommentById));
router.get("/comments", asyncMiddleware(commentController.getAllComments));
router.get("/comments/:id", asyncMiddleware(commentController.getCommentById));
router.delete("/comments/:id", asyncMiddleware(commentController.deleteComment));

export default router;
