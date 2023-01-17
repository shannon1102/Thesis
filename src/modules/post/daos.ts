import { getRepository } from "typeorm";
import configs from "../../configs";
import { User } from "../../entities/user";
import { Pagination } from "../../types/type.pagination";
import { Post } from "../../entities/post/post";
import { PostCreateParamsType } from "../../types/type.post";

const createPost = async (data: Post) => {
  const postRepository = getRepository(Post);
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
    .leftJoinAndSelect("p.PostTags", "at", "at.isDeleted = false")
    .leftJoinAndSelect("at.tag", "t", "t.isDeleted = false")
    .where(`a.id = ${id} and a.isDeleted = false`)
    .getOne();
  return post;
};

const getPostsByUserId = async (condition: { userId: number; exceptPostId?: number; limit?: number; offset?: number }) => {
  const postRepository = getRepository(Post);
  let whereConditionGetPost = `a.userId = ${condition.userId} and a.isDeleted = false`;
  if (condition.exceptPostId) {
    whereConditionGetPost += ` and a.id != ${condition.exceptPostId}`;
  }
  const posts = await postRepository
    .createQueryBuilder("a")
    .leftJoinAndSelect("a.PostTags", "at")
    .leftJoinAndSelect("at.tag", "t", "t.isDeleted = false")
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

const updatePost = async (PostId: number, data: postUpdateParamsType, tags: { id: number; postTagId?: number }[]) => {
  const postRepository = getRepository(Post);
  const postData = {
    ...data,
    updatedAt: new Date(),
  };
  await postRepository.update(PostId, postData);
  tags?.length &&
    (await tags.forEach(async (tag) => {
      if (!tag.PostTagId) {
        await postTagDaos.createPostTag({
          postId: postId,
          tagId: tag.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
        });
      }
    }));
  const post: Post = await postRepository.findOne(PostId);
  return post;
};

const getPostsByTagId = async (tagId: number, userId: number) => {
  const postRepository = getRepository(Post);
  const posts = await postRepository
    .createQueryBuilder("a")
    .innerJoin("a.PostTags", "at", `at.tagId = ${tagId} and at.isDeleted = false`)
    .where(`a.userId = ${userId} and a.isDeleted = false`)
    .getMany();
  return posts;
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
    .leftJoinAndSelect("a.PostTags", "at")
    .leftJoinAndSelect("at.tag", "t", "t.isDeleted = false")
    .leftJoinAndSelect("a.user", "u")
    .select(["a", "at", "t", "u.id", "u.name", "u.avatar"])
    .where("a.isDeleted = false")
    .orderBy("a.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();
  const total = await postRepository.createQueryBuilder("a").where("a.isDeleted = false").getCount();
  return {
    posts,
    total,
  };
};

export default {
  createPost,
  getPostById,
  getPostsByUserId,
  updatePost,
  getPostsByTagId,
  getPostsByUserIdFilterByTag,
  getAllPosts,
};
