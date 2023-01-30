import { User } from "../../entities/user";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import { Pagination } from "../../types/type.pagination";
import { PostCreateParamsType, PostUpdateParamsType } from "../../types/type.post";
import postDao from "./daos";

const createPost = async (post: PostCreateParamsType, tags: { id: number }[] = []) => {
  const author = new User();
  // post.users 
  const newPost = await postDao.createPost(post);

  const PostRes = await postDao.getPostById(newPost.id);
  return PostRes;
};

const getPostsByUserId = async (userId: number, pagination: Pagination) => {
  const result = await postDao.getPostsByUserId({ userId, ...pagination });
  return result;
};

const getPostById = async (id: number) => {
  const Post = await postDao.getPostById(id);
  if (!Post) {
    throw new CustomError(codes.NOT_FOUND, "Post not found!");
  }
  const relativePosts = await postDao.getPostsByUserId({
    userId: Post.userId,
    exceptPostId: Post.id,
    limit: 8,
  });
  return {
    Post,
    relativePosts,
  };
};

const updatePostById = async (postId: number, postData: PostUpdateParamsType) => {
  return await postDao.updatePost(postId, postData);
};

const getAllPosts = async (params: Pagination) => {
  return await postDao.getAllPosts(params);
};

export default { createPost, getPostsByUserId, getPostById, updatePostById, getAllPosts };
