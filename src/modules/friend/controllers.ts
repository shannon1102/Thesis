import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import { Friend } from "../../entities/friend";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import friendService from "./services";

const createFriend= async (req: Request, res: Response) => {
  const { friendId} = req.body;
  const currentUserId = req.user.id;
  const newFriend= new Friend();
  newFriend.userId = currentUserId;
  newFriend.friendId = friendId;
  const creteFriendRes = await friendService.createFriend(newFriend);
  res.status(200).json({
    status: "success",
    result: creteFriendRes,
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
  console.log("Get ALl Friends",req);
  const { limit, offset } = req.query;
  const userId = req.user.id
  const friends = await friendService.getAllFriends({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  },userId);

  return res.status(200).json({
    status: "success",
    result: friends[0],
    total: friends[1],
  });
};

const deleteFriend= async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const data = await friendService.deleteFriendById(id);
  res.status(200).json({
    status: "success",
    result: data,
  });
};

export default { createFriend, getFriendById, getAllFriends, deleteFriend};