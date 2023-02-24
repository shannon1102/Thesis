import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import { Comment } from "../../entities/post/comment";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import commentService from "./services";
import postService from "../post/services";
const createComment = async (req: Request, res: Response) => {
  const { postId, comment } = req.body;
  const currentUserId = req.user.id;
  const newComment = new Comment();
  newComment.userId = currentUserId;
  newComment.postId = postId;
  newComment.comment = comment;

  const creteCommentRes = await commentService.createComment(newComment);
  const updatePost = await postService.getPostById(newComment.postId)
  res.status(200).json({
    status: "success",
    result: updatePost,
  });
};

const getCommentById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.CommentId);
  const currentUserId = req.user;
  if (currentUserId.role !== "admin") {
    throw new CustomError(codes.FORBIDDEN);
  }
  const response = await commentService.getCommentById(id);
  res.status(200).json({
    status: "success",
    result: response,
  });
};

const getAllComments = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const comments = await commentService.getAllComments({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  });

  return res.status(200).json({
    status: "success",
    result: comments[0],
    total: comments[1],
  });
};

const deleteComment = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const data = await commentService.deleteCommentById(id);
  res.status(200).json({
    status: "success",
    result: data,
  });
};

export default { createComment, getCommentById, getAllComments, deleteComment };