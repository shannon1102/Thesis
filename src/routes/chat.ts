import { validateCreatePosts } from "../validations/post";
import express from "express";
import asyncMiddleware from "../middlewares/async";
import conversationController from "../modules/chat/conversation/controllers";
import messageController from "../modules/chat/message//controllers";
import ROLES from "../constants/roles";
const router = express.Router();

router.post("/chat/conversations", asyncMiddleware(conversationController.createConversation));
router.put("/chat/conversations/:id", asyncMiddleware(conversationController.getConversationById));
router.get("/chat/conversations", asyncMiddleware(conversationController.getAllConversations));
router.get("/chat/conversations/:id", asyncMiddleware(conversationController.getConversationById));
router.delete("/chat/conversations/:id", asyncMiddleware(conversationController.deleteConversation));
router.post("/chat/messages", asyncMiddleware(messageController.createMessage));

export default router;
