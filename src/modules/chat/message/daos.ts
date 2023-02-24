import { getRepository } from "typeorm";
import { Message } from "../../../entities/chat/message";
import { Pagination } from "../../../types/type.pagination";
import configs from "../../../configs";
const createMessage = async (data: Message) => {
  const messageRepository = getRepository(Message);
  const messageData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const message = messageRepository.create(messageData);
  return await messageRepository.save(message);
};

// const getMessageById = async (id: number) => {
//   const MessageRepository = getRepository(Message);
//   const Message = await MessageRepository
//     .createQueryBuilder("c")
//     .where(`c.id = ${id}`)
//     .getOne();
//   return Message;
// };
// const deleteMessageById = async (id: number) => {
//   const MessageRepository = getRepository(Message);
//   const Message = await MessageRepository.delete(id);
//   return Message;
// };


const getAllMessages = async (params: Pagination,conversationId: number) => {
  const messageRepository = getRepository(Message);
  const messages = await messageRepository
    .createQueryBuilder("d")
    .orderBy("d.createdAt", "DESC")
    .where(`conversationId = ${conversationId}`)
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return messages;
};

// const getMessagesByPostId = async (params: Pagination, productId: number) => {
//   const MessageRepository = getRepository(Message);
//   const Messages = await MessageRepository
//     .createQueryBuilder("c")
//     .where(`d.productId = ${productId}`)
//     .orderBy("c.createdAt", "DESC")
//     .skip(params.offset)
//     .take(params.limit || configs.MAX_RECORDS_PER_REQ)
//     .getManyAndCount();
//   return Messages;
// };
// const getMessagesByUserId = async (params: Pagination, userId: number) => {
//   const MessageRepository = getRepository(Message);
//   const Messages = await MessageRepository
//     .createQueryBuilder("d")
//     .where(`d.userId = ${userId}`)
//     .orderBy("d.createdAt", "DESC")
//     .skip(params.offset)
//     .take(params.limit || configs.MAX_RECORDS_PER_REQ)
//     .getManyAndCount();
//   return Messages;
// };
export default {
  createMessage,
  getAllMessages,

};
