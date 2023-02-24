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

const deleteFriendByFriendId = async (friendId: number, userId: number) => {
  const friendRepository = getRepository(Friend);

  const deletedFriend = await friendRepository.findOne({
    where: {
      friendId: friendId,
      userId: userId
    }
  })

  return await friendRepository.delete(deletedFriend?.id);
};


const getAllFriends = async (params: Pagination, userId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("f")
    .where(`(f.requesterId= ${userId} OR f.addresseeId = ${userId}) AND f.statusCode = 2`)
    // .orderBy("c.createdAt", "DESC")
    .leftJoinAndSelect("f.requester", "requester", "f.requesterId= requester.id")
    .leftJoinAndSelect("f.addressee", "addressee", "f.addresseeId = addressee.id")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};




const getAllRequestFriends = async (params: Pagination, userId: number) => {
  const friendRepository = getRepository(Friend);
  const friends = await friendRepository
    .createQueryBuilder("f")
    .where(`f.addresseeId= ${userId} and statusCode = 1`)
    .leftJoinAndSelect(`f.requester`, "requester")
    .orderBy("f.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return friends;
};
const getAllSuggestFriends = async (params: Pagination, userId: number) => {
  const friendRepository = getRepository(Friend);
  const userRepository = getRepository(User);
  const userFriends = await friendRepository
    .createQueryBuilder("f")
    .where(`f.addresseeId= ${userId} and statusCode = 2`)
    .getMany();
  console.log("userFriends", userFriends);
  let arr: User[]= [];
  if(userFriends.length > 0) {
    let userFriendIds = [...new Set(userFriends.map(e => [e.requesterId, e.addresseeId]).flat(1).filter(e => e != userId))];
    console.log("useFriendIds", userFriendIds)
    const suggesFriend = await friendRepository
      .createQueryBuilder("f")
      .where(`f.addresseeId IN (:userFriendIds) OR f.requesterId IN (:userFriendIds)`, { userFriendIds: userFriendIds, userId: userId })
      .leftJoinAndSelect(`f.requester`, "requester")
      .leftJoinAndSelect(`f.addressee`, "addressee")
      .skip(params.offset)
      .take(params.limit || configs.MAX_RECORDS_PER_REQ)
      .getManyAndCount();

    let suggestedList = suggesFriend[0].map(a => {
      if (a?.requester?.id != userId && !userFriendIds.includes(a.requester.id))
        arr.push(a.requester);
      if (a?.addressee?.id != userId && !userFriendIds.includes(a.addressee.id))
        arr.push(a.addressee)
    })
    console.log("Arrr",arr);

  } else {
    const user = await userRepository
    .createQueryBuilder("u")
    .where(`u.Id NOT IN (:userId)`, { userId: userId })
    // .orderBy("u.createAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getMany();

    arr = user;

  }
 

  return [arr];
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

const addFriend = async (requesterId: number, addresseeId: number) => {
  const friendRepository = getRepository(Friend);
  const friendData = {
    requesterId: requesterId,
    addresseeId: addresseeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    //Status 1 : request , 2 accecpt , 3 Declined 
    statusCode: 1,
  };
  const friend = friendRepository.create(friendData);
  return await friendRepository.save(friend);

}
const accecptFriend = async (requesterId: number, addresseeId: number) => {

  const friendRepository = getRepository(Friend);
  const foundFriendShip = await friendRepository.findOne(
    {
      where: {
        requesterId: requesterId,
        addresseeId: addresseeId
      }
    }
  );
  console.log("foundFriendShip", foundFriendShip)
  const friendData = {
    ...foundFriendShip,
    createdAt: new Date(),
    updatedAt: new Date(),
    //Status 1 : request , 2 accecpt , 3 Declined 
    statusCode: 2,
  };
  return await friendRepository.save(friendData);
}
const declineRequestFriend = async (requesterId: number, addresseeId: number) => {

  const friendRepository = getRepository(Friend);
  const foundFriendShip = await friendRepository.findOne(
    {
      where: {
        requesterId: requesterId,
        addresseeId: addresseeId
      }
    }
  );
  console.log("foundFriendShip", foundFriendShip)
  const friendData = {
    ...foundFriendShip,
    createdAt: new Date(),
    updatedAt: new Date(),
    //Status 1 : request , 2 accecpt , 3 Declined 
    statusCode: 3,
  };
  return await friendRepository.save(friendData);
}
export default {
  createFriend,
  deleteFriendByFriendId,
  getAllFriends,
  getAllRequestFriends,
  getAllSuggestFriends,
  deleteFriendById,
  getFriendsByPostId,
  getFriendById,
  addFriend,
  accecptFriend,
  declineRequestFriend
};
