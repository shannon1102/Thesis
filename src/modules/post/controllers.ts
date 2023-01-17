import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import postService from "./services";

const createPost = async (req: Request, res: Response) => {
  const { title, description, content, avatar, tags } = req.body;
  const currentUserId = req.user.id;
  const post = await postService.createPost({ title, description, content, avatar, userId: currentUserId }, tags);
  delete post.userId;
  res.status(200).json({
    status: "success",
    result: post,
  });
};

const getPosts = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  const data = await postService.getPostsByUserId(currentUserId, {
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  });
  res.status(200).json({
    status: "success",
    result: data.Posts,
    total: data.total,
  });
};

const getPostById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.PostId);
  const response = await postService.getPostById(id);
  res.status(200).json({
    status: "success",
    result: response,
  });
};

const updatePostById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.PostId);
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  const checkPost = await postService.getPostById(id);
  if (checkPost.Post.userId !== currentUserId && req.user.role !== ROLES.ADMIN) {
    throw new CustomError(codes.FORBIDDEN);
  }
  const tagIds = req.body.tagIds;
  const dataUpdate = req.body;
  delete dataUpdate.tagIds;
  const post = await postService.updatePostById(id, dataUpdate, tagIds);
  if (Number(currentUserId) !== Number(Post.userId)) {
    throw new CustomError(codes.UNAUTHORIZED);
  }
  res.status(200).json({
    status: "success",
    result: post,
  });
};

const getAllPosts = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const data = await postService.getAllPosts({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  });
  res.status(200).json({
    status: "success",
    result: data.Posts,
    total: data.total,
  });
};

export default { createPost, getPosts, getPostById, updatePostById, getAllPosts };