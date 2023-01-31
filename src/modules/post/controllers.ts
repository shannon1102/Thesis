import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import postService from "./services";

const createPost = async (req: Request, res: Response) => {
  const { description } = req.body;
  console.log("req")
  const currentUserId = req.user.id;
  const post = await postService.createPost({ description, userId: currentUserId });
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
    result: data.posts,
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
  console.log(req.params)
  const id: number = Number(req.params.id);
  const currentUserId: number = req.user?.id;
  if (!currentUserId) {
    throw new CustomError(codes.NOT_FOUND);
  }
  const checkPost = await postService.getPostById(id);
  if (checkPost.post.userId !== currentUserId && req.user.role !== ROLES.ADMIN) {
    throw new CustomError(codes.FORBIDDEN);
  }
  const dataUpdate = req.body;
  delete dataUpdate.image
  delete dataUpdate.video
  const post = await postService.updatePostById(id, dataUpdate);
  if (Number(currentUserId) !== Number(post.userId)) {
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
    result: data.posts,
    total: data.total,
  });
};

export default { createPost, getPosts, getPostById, updatePostById, getAllPosts };
