import { Request, Response } from "express";
import messageService from "./services";
import conversationService from "../conversation/services";
import CustomError from "../../../errors/customError";
import configs from "../../../configs";
import { Message } from "../../../entities/chat/message";

const createMessage = async (req: Request, res: Response) => {
  const { conversationId, message } = req.body;
  const userId = req.user.id;
  const newMessage = new Message();
  newMessage.userId = userId;
  newMessage.conversationId = conversationId;
  newMessage.message = message;

  const creteMessageRes = await messageService.createMessage(newMessage);
  const messages = await conversationService.getConversationById(conversationId);
  res.status(200).json({
    status: "success",
    result: messages,
  });
};


const getAllMessages = async (req: Request, res: Response) => {
  const { limit, offset , conversationId} = req.query;
  const messages = await messageService.getAllMessages({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  },+conversationId);

  return res.status(200).json({
    status: "success",
    result: messages[0],
    total: messages[1],
  });
};

export default { createMessage, getAllMessages };