import { getRepository } from "typeorm";
import configs from "../../configs";
import { Comment } from "../../entities/post/comment";
import { User } from "../../entities/user";
import { Pagination } from "../../types/type.pagination";

const createComment = async (data: Comment) => {
  const commentRepository = getRepository(Comment);
  const commentData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const comment = commentRepository.create(commentData);
  return await commentRepository.save(comment);
};

const getCommentById = async (id: number) => {
  const commentRepository = getRepository(Comment);
  const comment = await commentRepository
    .createQueryBuilder("c")
    .where(`c.id = ${id}`)
    .getOne();
  return comment;
};
const deleteCommentById = async (id: number) => {
  const commentRepository = getRepository(Comment);
  const comment = await commentRepository.delete(id);
  return comment;
};


const getAllComments = async (params: Pagination) => {
  const commentRepository = getRepository(Comment);
  const comments = await commentRepository
    .createQueryBuilder("c")
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return comments;
};

const getCommentsByPostId = async (params: Pagination, postId: number) => {
  const commentRepository = getRepository(Comment);
  const comments = await commentRepository
    .createQueryBuilder("c")
    .where(`c.postId = ${postId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return comments;
};
export default {
  createComment,
  getCommentById,
  getAllComments,
  deleteCommentById,
  getCommentsByPostId
};
