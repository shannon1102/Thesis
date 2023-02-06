import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import postController from "../modules/post/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/posts", asyncMiddleware(postController.createPost));
router.put("/posts/:id", asyncMiddleware(postController.updatePostById));
router.get("/posts", asyncMiddleware(postController.getAllPosts));
router.get("/posts/:id", asyncMiddleware(postController.getPostById));
router.delete("/posts/:id", asyncMiddleware(postController.deletePost));

export default router;
