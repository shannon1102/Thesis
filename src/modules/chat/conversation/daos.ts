import { getRepository } from "typeorm";
import { Conversation } from "../../../entities/chat/conversation";
import { Pagination } from "../../../types/type.pagination";
import configs from "../../../configs";

const createConversation = async (data: Conversation) => {
  const conversationRepository = getRepository(Conversation);
  const conversationData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const conversation = conversationRepository.create(conversationData);
  return await conversationRepository.save(conversation);
};

const getConversationById = async (id: number) => {
  const conversationRepository = getRepository(Conversation);
  const conversation = await conversationRepository
    .createQueryBuilder("c")
    .orderBy("c.createdAt", "DESC")
    .leftJoinAndSelect(`c.firstUser`,"firstUser")
    .leftJoinAndSelect(`c.secondUser`,"secondUser")
    .leftJoinAndSelect(`c.messages`,"messages")
    .leftJoinAndSelect(`messages.user`,"sender","messages.user = messages.userId ")
    .where(`c.id = ${id}`)
    .getOne();
  return conversation;
};
const deleteConversationById = async (userId: number, id: number) => {
  const conversationRepository = getRepository(Conversation);
  const conversation = await conversationRepository.delete(id);
  return conversation;
};


const getAllConversations = async (params: Pagination,userId: number) => {
  const conversationRepository = getRepository(Conversation);
  const conversations = await conversationRepository
    .createQueryBuilder("c")
    .orderBy("c.createdAt", "DESC")
    .leftJoinAndSelect(`c.firstUser`,"firstUser")
    .leftJoinAndSelect(`c.secondUser`,"secondUser")
    .leftJoinAndSelect(`c.messages`,"messages")
    .where(`c.firstUserId =${userId}  OR c.secondUserId =${userId}`)
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return conversations;
};

export default {
  createConversation,
  getConversationById,
  getAllConversations,
  deleteConversationById,
};
