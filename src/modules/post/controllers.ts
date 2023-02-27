import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import postService from "./services";

const createPost = async (req: Request, res: Response) => {
  const { description, media } = req.body;
  console.log("req")
  const currentUserId = req.user.id;
  console.log("reqCURRENTUSER",req.user)
  //creat media here
  const post = await postService.createPost({ description, userId: currentUserId, media });
  delete post.userId;
  res.status(200).json({
    status: "success",
    result: post,
  });
};

const getPosts = async (req: Request, res: Response) => {
  const { limit, offset, userId } = req.query;
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
  const id: number = Number(req.params.id);
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
  const { limit, offset, userId } = req.query;
  let data;
  if(userId) {
    data = await postService.getPostsByUserId(+userId,{
      limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
      offset: Number(offset) || 0,
    });

  } else{
     data = await postService.getAllPosts({
      limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
      offset: Number(offset) || 0,
    });
  }

  res.status(200).json({
    status: "success",
    result: data.posts,
    total: data.total,
  });
};

const deletePost = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  console.log("id",id);
  
  const data = await postService.deletePost(id);
  res.status(200).json({
    status: "success",
    result: data,
  });
}

export default { createPost, getPosts, getPostById, updatePostById, getAllPosts, deletePost };
