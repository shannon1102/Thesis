import { Request, Response } from "express";
import conversationService from "./services";
import { Conversation } from "../../../entities/chat/conversation";
import codes from "../../../errors/codes";
import configs from "../../../configs";
import CustomError from "../../../errors/customError";

const createConversation = async (req: Request, res: Response) => {
  const { firstUserId, secondUserId } = req.body;
  // const currentUserId = req.user.id;
  const newConversation = new Conversation();
  newConversation.firstUserId = firstUserId;
  newConversation.secondUserId = secondUserId;

  const conversation = await conversationService.createConversation(newConversation);
  res.status(200).json({
    status: "success",
    result: conversation,
  });
};

const getConversationById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const currentUserId = req.user;
  // if (currentUserId.role !== "admin") {
  //   throw new CustomError(codes.FORBIDDEN);
  // }
  const response = await conversationService.getConversationById(id);
  res.status(200).json({
    status: "success",
    result: response,
  });
};

const getAllConversations = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const userId = req.user.id;
  const conversations = await conversationService.getAllConversations({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  },userId);
  // const getAllUserConversations = async (req: Request, res: Response) => {
  //   const { limit, offset } = req.query;
  //   const conversations = await conversationService.getAllConversations({
  //     limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
  //     offset: Number(offset) || 0,
  //   });

  return res.status(200).json({
    status: "success",
    result: conversations[0],
    total: conversations[1],
  });
};

const deleteConversation = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const userId = +req.user.id;

  return await conversationService.deleteConversationById(userId,id);
};

export default { createConversation, getConversationById, getAllConversations, deleteConversation };
