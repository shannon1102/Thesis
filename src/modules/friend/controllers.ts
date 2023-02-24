import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import { Friend } from "../../entities/friend";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import friendService from "./services";



const getAllRequestFriends = async (req: Request, res: Response) => {
  console.log("Get ALl Friends");
  const { limit, offset } = req.query;
  const userId = req.user.id
  const friends = await friendService.getAllRequestFriends({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  }, +userId);

  return res.status(200).json({
    status: "success",
    result: friends[0],
    total: friends[1],
  });
};
const getFriendById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.FriendId);
  const currentUserId = req.user;
  if (currentUserId.role !== "admin") {
    throw new CustomError(codes.FORBIDDEN);
  }
  const response = await friendService.getFriendById(id);
  res.status(200).json({
    status: "success",
    result: response,
  });
};

const getAllFriends = async (req: Request, res: Response) => {
  console.log("Get ALl Friends", req.query, req.user);
  let { limit, offset } = req.query;
  let userId: number = req.query?.userId ? +(req.query?.userId) : req.user.id

  // const userId = req.user.id
  const friends = await friendService.getAllFriends({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  }, +userId);

  return res.status(200).json({
    status: "success",
    result: friends[0],
    total: friends[1],
  });
};
const getAllSuggestFriends = async (req: Request, res: Response) => {
  // console.log("Get ALl Friends", req.query, req.user);
  let { limit, offset } = req.query;
  let userId: number = req.query?.userId ? +(req.query?.userId) : req.user.id

  // const userId = req.user.id
  const friends = await friendService.getAllSuggestFriends({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  }, +userId);

  return res.status(200).json({
    status: "success",
    result: friends[0],
    total: friends[1],
  });
};

const deleteFriend = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const data = await friendService.deleteFriendById(id);
  res.status(200).json({
    status: "success",
    result: data,
  });
};
const addFriend = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const addresseeId: number = Number(req.body.addresseeId);
  console.log("UserId,addressId", userId, addresseeId);
  const data = await friendService.addFriend(+userId, addresseeId);
  res.status(200).json({
    status: "success",
    result: data,
  });
};
const acceptFriend = async (req: Request, res: Response) => {
  const requestUserId = req.body.requesterId;
  const addresseeId = req.user.id;
  console.log("requestUserIdrequestUserIdrequestUserId", requestUserId.addresseeId)
  const data = await friendService.acceptFriend(+requestUserId, addresseeId);
  res.status(200).json({
    status: "success",
    result: data,
  });
};
const declineFriend = async (req: Request, res: Response) => {
  const requestUserId = req.body.requesterId;
  const addresseeId = req.user.id;
  console.log("requestUserIdrequestUserIdrequestUserId", requestUserId.addresseeId)
  const data = await friendService.acceptFriend(+requestUserId, addresseeId);
  res.status(200).json({
    status: "success",
    result: data,
  });
};

export default { addFriend, acceptFriend, declineFriend, getAllSuggestFriends, getAllRequestFriends, getFriendById, getAllFriends, deleteFriend };