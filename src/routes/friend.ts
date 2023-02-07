import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import friendController from "../modules/friend/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/friends", asyncMiddleware(friendController.createFriend));
router.put("/friends/:id", asyncMiddleware(friendController.getFriendById));
router.get("/friends", asyncMiddleware(friendController.getAllFriends));
router.get("/friends/:id", asyncMiddleware(friendController.getFriendById));
router.delete("/friends/:id", asyncMiddleware(friendController.deleteFriend));

export default router;
