import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import depositService from "./services";
import { Deposit } from "../../entities/deposit/deposit";

const createDeposit = async (req: Request, res: Response) => {
  
  let { productId , price, customerName,
    customerEmail, customerPhone,
    customerAddress,
    paymentMethod,
    status,
  } = req.body;
  const currentUserId = req.user.id;


  const newDeposit = new Deposit();
  newDeposit.userId = currentUserId;

  newDeposit.productId =productId;
  newDeposit.price= price;
  newDeposit.customerAddress =customerAddress;
  newDeposit.customerEmail =customerEmail;
  newDeposit.customerName =customerName;
  newDeposit.customerPhone= customerPhone;
  newDeposit.paymentMethod ="Card";
  newDeposit.status = "Success"
  console.log("Aloooooo",newDeposit)


  const creteDepositRes = await depositService.createDeposit(newDeposit);
  res.status(200).json({
    status: "success",
    result: creteDepositRes,
  });
};

const getDepositById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.DepositId);
  const currentUserId = req.user;
  if (currentUserId.role !== "admin") {
    throw new CustomError(codes.FORBIDDEN);
  }
  const response = await depositService.getDepositById(id);
  res.status(200).json({
    status: "success",
    result: response,
  });
};

const getAllDeposits = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const Deposits = await depositService.getAllDeposits({
    limit: Number(limit) || configs.MAX_RECORDS_PER_REQ,
    offset: Number(offset) || 0,
  });

  return res.status(200).json({
    status: "success",
    result: Deposits[0],
    total: Deposits[1],
  });
};

const deleteDeposit = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const data = await depositService.deleteDepositById(id);
  res.status(200).json({
    status: "success",
    result: data,
  });
};

export default { createDeposit, getDepositById, getAllDeposits, deleteDeposit };