import { getRepository } from "typeorm";
import configs from "../../configs";
import { User } from "../../entities/user";
import { Pagination } from "../../types/type.pagination";
import { Post } from "../../entities/post/post";
import { PostCreateParamsType, PostUpdateParamsType } from "../../types/type.post";
import mediaDaos from "../media/daos";
import mediaMapDaos from "../mediaMap/daos";
import { formatLikePost,formatLikePosts } from "./helper";

const createPost = async (data: Post) => {
  const postRepository = getRepository(Post);
  console.log("POST",data);
  const postData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const post = postRepository.create(postData);
  return await postRepository.save(post);
};

const getPostById = async (id: number) => {
  const postRepository = getRepository(Post);
  const post = await postRepository
    .createQueryBuilder("p")
    .leftJoinAndSelect("p.mediaMaps", "mm", `mm.targetType='post'`)
    .leftJoinAndSelect("mm.media", "m")
    .leftJoinAndSelect("p.likes", "like", "like.postId = p.id")
    .leftJoinAndSelect("p.user", "user", "user.id = p.userId")
    .leftJoinAndSelect("p.comments", "cmt", "cmt.isDeleted = false and cmt.postId = p.id")
    .leftJoinAndSelect("cmt.user","poster")
    .where(`p.id = ${id} and p.isDeleted = false`)
    .getOne();

    let {isLiked,like } = formatLikePost(post);
    // delete post.likes

  return {...post,
    isLiked,
    like
  };
};

const getPostsByUserId = async (condition: { userId: number; exceptPostId?: number; limit?: number; offset?: number }) => {
  const postRepository = getRepository(Post);
  let whereConditionGetPost = `a.userId = ${condition.userId} and a.isDeleted = false`;
  if (condition.exceptPostId) {
    whereConditionGetPost += ` and a.id != ${condition.exceptPostId}`;
  }
  const posts = await postRepository
    .createQueryBuilder("a")
    .leftJoinAndSelect("a.mediaMaps", "mm", `mm.targetType='post'`)
    .leftJoinAndSelect("mm.media", "m")
    .leftJoinAndSelect("a.likes", "like", "like.postId = a.id")
    .leftJoinAndSelect("a.comments", "cmt", "cmt.isDeleted = false and cmt.postId = a.id")
    .where(whereConditionGetPost)
    .orderBy("a.createdAt", "DESC")
    .skip(condition.offset || 0)
    .take(condition.limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();
  const total = await postRepository.createQueryBuilder("a").where("a.userId = :userId and a.isDeleted = false", { userId: condition.userId }).getCount();
  return {
    posts: posts,
    total,
  };
};

const updatePost = async (postId: number, data: PostUpdateParamsType) => {
  const postRepository = getRepository(Post);

  const postData = {
    ...data,
    updatedAt: new Date(),
  };
  await postRepository.update(postId, postData);
  const post: Post = await getPostById(postId);
  return post;
};



const getPostsByUserIdFilterByTag = async (condition: { userId: number; limit?: number }) => {
  const userRepository = getRepository(User);
  const data = await userRepository
    .createQueryBuilder("u")
    .leftJoinAndSelect("u.tags", "t")
    .leftJoinAndSelect("t.Posts", "a")
    .where(`a.userId = ${condition.userId} and a.isDeleted = false`);
  return data;
};

const getAllPosts = async (params: Pagination) => {
  const postRepository = getRepository(Post);
  const posts = await postRepository
    .createQueryBuilder("a")
    .leftJoinAndSelect("a.mediaMaps", "mm", `mm.targetType='post'`)
    .leftJoinAndSelect("mm.media", "m")
    .leftJoinAndSelect("a.likes", "like", "like.postId = a.id")
    .leftJoinAndSelect("a.comments", "cmt", "cmt.isDeleted = false and cmt.postId = a.id")
    .leftJoinAndSelect("cmt.user","poster")
    .leftJoinAndSelect("a.user", "u")
    // .select(["a", "at", "t", "u.id", "u.name", "u.avatar"])
    .where("a.isDeleted = false")
    .orderBy("a.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();
  const total = await postRepository.createQueryBuilder("a").where("a.isDeleted = false").getCount();
  return {
    posts: formatLikePosts(posts),
    total,
  };
};

const deletePost = async (postId: number) => {
  const postRepository = getRepository(Post);
  const deletePost = await postRepository.findOne(postId);
  console.log("FindOne",deletePost);
  const postData = {
    ...deletePost,
    isDeleted: true,
    updatedAt: new Date(),
  };
  return await postRepository.update(postId, postData);
  // console.log("postRepository",postRepository);
  // const post: Post = await getPostById(postId);

}
export default {
  createPost,
  getPostById,
  getPostsByUserId,
  updatePost,
  getPostsByUserIdFilterByTag,
  getAllPosts,
  deletePost
};
