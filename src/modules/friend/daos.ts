import { getRepository } from "typeorm";
import configs from "../../configs";
import { Friend } from "../../entities/friend";
import { User } from "../../entities/user";
import { Pagination } from "../../types/type.pagination";

const createFriend = async (data: Friend) => {
  const friendRepository = getRepository(Friend);
  const friendData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const friend = friendRepository.create(friendData);
  return await friendRepository.save(friend);
};

const getFriendById = async (id: number) => {
  const friendRepository = getRepository(Friend);
  const friend = await friendRepository
    .createQueryBuilder("f")
    .where(`f.id = ${id}`)
    .getOne();
  return friend;
};
const deleteFriendById = async (id: number) => {
  const friendRepository = getRepository(Friend);
  const friend = await friendRepository.delete(id);
  return friend;
};

const deleteFriendByFriendId = async (friendId: number,userId: number) => {
  const friendRepository = getRepository(Friend);
  
  const deletedFriend = await friendRepository.findOne({
    where: {
      friendId: friendId,
      userId: userId
    }
  })
  
  return await friendRepository.delete(deletedFriend?.id);
};


const getAllFriends = async (params: Pagination,userId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("f")
    .where(`f.userId= ${userId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};


const getAllSuggestFriends = async (params: Pagination,userId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("f")
    .where(`f.userId= ${userId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};


const getAllRequestFriends = async (params: Pagination,userId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("f")
    .where(`f.userId= ${userId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};

const getFriendsByPostId = async (params: Pagination, postId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("c")
    .where(`c.postId = ${postId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};
export default {
  createFriend,
  deleteFriendByFriendId,
  getAllFriends,
  getAllRequestFriends,
  getAllSuggestFriends,
  deleteFriendById,
  getFriendsByPostId,
  getFriendById
};
