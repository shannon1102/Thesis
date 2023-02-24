
import { Message } from "../../../entities/chat/message";
import { Pagination } from "../../../types/type.pagination";
import messageDao from "./daos";


const createMessage = async (message: Message) => {
  const newMessage = await messageDao.createMessage(message);
  // await sendEmail {Message);
  return newMessage;
};

const getAllMessages = async (params: Pagination, conversationId: number) => {
  return await messageDao.getAllMessages(params, conversationId);
};

export default { createMessage, getAllMessages };
