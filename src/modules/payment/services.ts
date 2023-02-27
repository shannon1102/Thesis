import { Media } from "../../entities/media";
import { MediaMap } from "../../entities/mediaMap";
import { User } from "../../entities/user";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import { Pagination } from "../../types/type.pagination";
import { PostCreateParamsType, PostUpdateParamsType } from "../../types/type.post";
import mediaMapServices from "../mediaMap/services";
import postDao from "./daos";

const createPost = async (post: PostCreateParamsType) => {

  let media = post.media;
  delete post.media;
  const newPost = await postDao.createPost(post);
  if (media) {

    //add media map here
    const addMedia: MediaMap[] = media
      .map((item: number) => {
        return {
          mediaId: item,
          targetType: "post",
          targetId: newPost.id,
        };
      });
    await mediaMapServices.createMediaMaps(addMedia);
  }

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
  let media = postData.media
  const findPost = await postDao.getPostById(postId);
  console.log("findProduct",findPost);
  if (postData.media) {
   
    const currentMediaMap = findPost.mediaMaps;
    const deleteMedia = currentMediaMap
      .filter((media: MediaMap) => {
        return !postData.media.find((item) => item === media.mediaId);
      })
      .map((item: MediaMap) => {
        return item.mediaId;
      });
      console.log("deleteMedia",deleteMedia);
      //Delete Media , Delete MediaMap
    const addMedia: MediaMap[] = postData.media
      .filter((media: number) => {
        return !currentMediaMap.find((item) => item.mediaId === media)
      })
      .map((item: number) => {
        return {
          mediaId: item,
          targetType: "post",
          targetId: findPost.id,
        };
      });
    // delete media
    const listDeleteMediaMap: MediaMap[] = deleteMedia.map((item: number) => {
      return {
        mediaId: item,
        targetType: "post",
        targetId: findPost.id,
      };
    });
    await mediaMapServices.deleteMediaMaps(listDeleteMediaMap);
    // update media
    await mediaMapServices.createMediaMaps(addMedia);
    delete postData.media;

  // let currentMediaIds = 
  delete postData.media
}
  return await postDao.updatePost(postId, postData);
};
const deletePost = async (postId: number) =>{

  return await postDao.deletePost(postId);
}
const getAllPosts = async (params: Pagination) => {
  return await postDao.getAllPosts(params);
};

export default { createPost, getPostsByUserId, getPostById, updatePostById, getAllPosts, deletePost };
