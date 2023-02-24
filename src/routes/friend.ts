import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import friendController from "../modules/friend/controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.get("/friends/suggested-friends", asyncMiddleware(friendController.getAllSuggestFriends));
router.get("/friends/requested-friends", asyncMiddleware(friendController.getAllRequestFriends));
router.post("/friends/add-friend", asyncMiddleware(friendController.addFriend));
router.post("/friends/accept-friend", asyncMiddleware(friendController.acceptFriend));
router.post("/friends/decline-request-friend", asyncMiddleware(friendController.declineFriend));
router.get("/friends/", asyncMiddleware(friendController.getAllFriends));
router.put("/friends/:id", asyncMiddleware(friendController.getFriendById));
router.delete("/friends/:id", asyncMiddleware(friendController.deleteFriend));
export default router;
