import authService from "../services/auth";
import friendService from "../../friend/services";
import { Request, Response } from "express";
import { User } from "../../../entities/user";
import CustomError from "../../../errors/customError";
import codes from "../../../errors/codes";
import configs from "../../../configs";

const register = async (req: Request, res: Response) => {
  const { email, password, name, phone, avatar } = req.body;
  const user: User = (await authService.register({ email, password, name, phone, avatar })) as User;
  delete user.password;
  delete user.role;
  return res.status(200).json({
    status: "success",
    result: user,
  });
};

const createUserByDevice = async (req: Request, res: Response) => {
  const { deviceId } = req.body;
  const user: User = (await authService.createUserByDeviceId({ deviceId })) as User;
  delete user.password;
  delete user.role;
  return res.status(200).json({
    status: "success",
    result: user,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: User = (await authService.login({ email, password })) as User;
  delete user.password;
  delete user.role;
  return res.status(200).json({
    status: "success",
    result: user,
  });
};

const me = async (req: Request, res: Response) => {
  const user = req.user;
  delete user.password;
  delete user.role;
  return res.status(200).json({
    status: "success",
    result: user,
  });
};
const getUserInfo = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  console.log("USERID",userId)

  let user = await authService.getUserInfo(userId);
  delete user.password;
  delete user.role;
  
  const friends = await friendService.getAllFriends({
    limit: configs.MAX_RECORDS_PER_REQ,
    offset:  0,
  },userId)
  
  return res.status(200).json({
    status: "success",
    result: {...user,
    friends: friends[0]},
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  // const userId = +req.params.userId;

  let user = await authService.getAllUsers(req.user);
  return res.status(200).json({
    status: "success",
    result: user})
};

const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    throw new CustomError(codes.BAD_REQUEST, "Please enter your old password!");
  }
  if (!newPassword) {
    throw new CustomError(codes.BAD_REQUEST, "Please enter your new password!");
  }
  const user = req.user;
  await authService.updatePassword(user, oldPassword, newPassword);
  return res.status(200).json({
    status: "success",
  });
};

const updateInfo = async (req: Request, res: Response) => {
  const { name, avatar, phone ,sex,age } = req.body;
  const user = req.user;
  let newInfo: User;
  if (name) {
    newInfo = newInfo || {};
    newInfo.name = name;
  }
  if (avatar) {
    newInfo = newInfo || {};
    newInfo.avatar = avatar;
  }
  if (phone) {
    newInfo = newInfo || {};
    newInfo.phone = phone;
  }

  if (sex) {
    newInfo = newInfo || {};
    newInfo.sex = sex;
  }
  if (age) {
    newInfo = newInfo || {};
    newInfo.age = age;
  }
  if (!newInfo) {
    throw new CustomError(codes.BAD_REQUEST, "No update information about user!");
  }
  const newUser = await authService.updateUserInfo(user, newInfo);
  delete newUser.password;
  delete newUser.role;
  return res.status(200).json({
    status: "success",
    result: newUser,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const newUser = await authService.deleteUser(+userId);
  return res.status(200).json({
    status: "success",
    result: newUser,
  });
};
export default { register,getAllUsers, deleteUser, login, me, createUserByDevice, updatePassword, updateInfo , getUserInfo};
