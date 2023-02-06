import { Comment } from "../../entities/post/comment";
import { Pagination } from "../../types/type.pagination";
import { sendEmail } from "../../utils/sendEmail";
import commentDao from "./daos";

const createComment = async (comment: Comment ) => {
  const newComment = await commentDao.createComment(comment);
  // await sendEmail {comment);
  return newComment;
};



const getCommentById = async (id: number) => {
  return await commentDao.getCommentById(id);

};


const deleteCommentById = async (id: number) => {
  return await commentDao.deleteCommentById(id);

};



const getAllComments = async (params: Pagination) => {
  return await commentDao.getAllComments(params);
};

export default { createComment,getCommentById,getAllComments ,deleteCommentById};
