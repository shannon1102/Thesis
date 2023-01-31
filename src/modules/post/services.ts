import { User } from "../../entities/user";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import { Pagination } from "../../types/type.pagination";
import { PostCreateParamsType, PostUpdateParamsType } from "../../types/type.post";
import postDao from "./daos";

const createPost = async (post: PostCreateParamsType) => {

  const newPost = await postDao.createPost(post);
    if (post.media) {
   
      //add media map here
    const addMedia: MediaMap[] = post.media
      .filter((media: Media) => {
        return !currentMedia.find((item) => item.id === media.id) && media.id !== post.featureImageId;
      })
      .map((item: Media) => {
        return {
          mediaId: item.id,
          targetType: "product",
          targetId: findProduct.id,
        };
      });
    // delete media
    const listDeleteMediaMap: MediaMap[] = deleteMedia.map((item: number) => {
      return {
        mediaId: item,
        targetType: "post",
        targetId: id,
      };
    });
    await mediaMapServices.deleteMediaMaps(listDeleteMediaMap);
    // update media
    await mediaMapServices.createMediaMaps(addMedia);
    delete data.media;

  const postRes = await postDao.getPostById(newPost.id);
  return postRes;
};

const getPostsByUserId = async (userId: number, pagination: Pagination) => {
  const result = await postDao.getPostsByUserId({ userId, ...pagination });
  return result;
};

const getPostById = async (id: number) => {
  const post = await postDao.getPostById(id);
  if (!post) {
    throw new CustomError(codes.NOT_FOUND, "Post not found!");
  }
  const relativePosts = await postDao.getPostsByUserId({
    userId: post.userId,
    exceptPostId: post.id,
    limit: 8,
  });
  return {
    post,
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
