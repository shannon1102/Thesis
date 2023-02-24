
import { Conversation } from "../../../entities/chat/conversation";
import { Pagination } from "../../../types/type.pagination";
import { sendEmail } from "../../../utils/sendEmail";
import conversationDao from "./daos";

const createConversation = async (conversation: Conversation ) => {
  const newConversation = await conversationDao.createConversation(conversation);
  // await sendEmail(conversation);
  return newConversation;
};



const getConversationById = async (id: number) => {
  return await conversationDao.getConversationById(id);

};


const deleteConversationById = async (userId:number ,id: number) => {
  return await conversationDao.deleteConversationById(userId,id);

};



const getAllConversations = async (params: Pagination,userId: number) => {
  return await conversationDao.getAllConversations(params,userId);
};

export default { createConversation,getConversationById,getAllConversations ,deleteConversationById};
