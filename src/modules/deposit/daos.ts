import { getRepository } from "typeorm";
import configs from "../../configs";

import { User } from "../../entities/user";
import { Pagination } from "../../types/type.pagination";
import { Deposit } from "../../entities/deposit/deposit";

const createDeposit = async (data: Deposit) => {
  const depositRepository = getRepository(Deposit);
  const DepositData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  };
  const deposit = depositRepository.create(DepositData);
  return await depositRepository.save(deposit);
};

const getDepositById = async (id: number) => {
  const depositRepository = getRepository(Deposit);
  const deposit = await depositRepository
    .createQueryBuilder("c")
    .where(`c.id = ${id}`)
    .getOne();
  return Deposit;
};
const deleteDepositById = async (id: number) => {
  const depositRepository = getRepository(Deposit);
  const deposit = await depositRepository.delete(id);
  return Deposit;
};


const getAllDeposits = async (params: Pagination) => {
  const depositRepository = getRepository(Deposit);
  const Deposits = await depositRepository
    .createQueryBuilder("d")
    .orderBy("d.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return Deposits;
};

const getDepositsByPostId = async (params: Pagination, productId: number) => {
  const depositRepository = getRepository(Deposit);
  const Deposits = await depositRepository
    .createQueryBuilder("c")
    .where(`d.productId = ${productId}`)
    .orderBy("c.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return Deposits;
};
const getDepositsByUserId = async (params: Pagination, userId: number) => {
  const depositRepository = getRepository(Deposit);
  const Deposits = await depositRepository
    .createQueryBuilder("d")
    .where(`d.userId = ${userId}`)
    .orderBy("d.createdAt", "DESC")
    .skip(params.offset)
    .take(params.limit || configs.MAX_RECORDS_PER_REQ)
    .getManyAndCount();
  return Deposits;
};
export default {
  createDeposit,
  getDepositById,
  getAllDeposits,
  deleteDepositById,
  getDepositsByPostId,
  getDepositsByUserId
};
