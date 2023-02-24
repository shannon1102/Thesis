import { Deposit } from "../../entities/deposit/deposit";
import { Pagination } from "../../types/type.pagination";
import { sendEmail } from "../../utils/sendEmail";
import depositDao from "./daos";

const createDeposit = async (deposit: Deposit ) => {
  const newDeposit = await depositDao.createDeposit(deposit);
  // await sendEmail {Deposit);
  return newDeposit;
};



const getDepositById = async (id: number) => {
  return await depositDao.getDepositById(id);

};


const deleteDepositById = async (id: number) => {
  return await depositDao.deleteDepositById(id);

};



const getAllDeposits = async (params: Pagination) => {
  return await depositDao.getAllDeposits(params);
};

const getAllDepositsByuserId = async (params: Pagination,userId:number) => {
  return await depositDao.getDepositsByUserId(params,userId);
};

export default { getAllDepositsByuserId, createDeposit,getDepositById,getAllDeposits ,deleteDepositById};
