import { Friend } from "../../entities/friend";
import { Pagination } from "../../types/type.pagination";
import { sendEmail } from "../../utils/sendEmail";
import friendDao from "./daos";

const createFriend = async (friend: Friend) => {
  const newFriend = await friendDao.createFriend(friend);
  // await sendEmail {Friend);
  return newFriend;
};



const getFriendById = async (id: number) => {
  return await friendDao.getFriendById(id);

};


const deleteFriendById = async (id: number) => {
  return await friendDao.deleteFriendById(id);

};
const deleteFriendByFriendId = async (friendId: number,userId: number) => {
  return await friendDao.deleteFriendByFriendId(friendId,userId);

};



const getAllFriends = async (params: Pagination, userId: number) => {
  return await friendDao.getAllFriends(params, userId);
};

export default { createFriend, getFriendById, getAllFriends, deleteFriendById };
