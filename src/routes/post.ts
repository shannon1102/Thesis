import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import postController from "../modules/post/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/admin/posts", asyncMiddleware(postController.createPost));
router.post("/add_post", asyncMiddleware(postController.createPost));
router.put("/admin/posts/:postId", asyncMiddleware(postController.updatePostById));
router.get("/admin/posts", asyncMiddleware(postController.getPosts));
router.get("/posts", asyncMiddleware(postController.getAllPosts));
router.get("/get_list_posts", asyncMiddleware(postController.getAllPosts));
router.get("/posts/:postId", asyncMiddleware(postController.getPostById));

export default router;
