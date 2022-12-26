import { getRepository } from "typeorm";
import { Collection } from "../../entities/collection";
import { Pagination } from "../../types/type.pagination";

const createCollection = async (data: Collection): Promise<Collection> => {
  const collectionRepo = getRepository(Collection);
  const newCollection = collectionRepo.create(data);
  return await collectionRepo.save(newCollection);
};

const updateCollection = async (id: number, data: Collection): Promise<Collection> => {
  const collectionRepo = getRepository(Collection);
  await collectionRepo.update(id, data);
  return data;
};

const getCollectionById = async (id: number): Promise<Collection> => {
  const collectionRepo = getRepository(Collection);
  const collection = await collectionRepo.findOne(id);
  return collection;
};

const getCollections = async (params: {
  pagination: Pagination;
}): Promise<{ collections: Collection[]; total: number }> => {
  const collectionRepo = getRepository(Collection);
  let collectionQuery = await collectionRepo.createQueryBuilder("c").orderBy("c.createdAt", "DESC");
  const collections = await collectionQuery.skip(params.pagination.offset).take(params.pagination.limit).getMany();
  const total = await collectionQuery.getCount();
  return {
    collections,
    total,
  };
};

const deleteCollection = async (id: number) => {
  const collectionRepo = getRepository(Collection);
  await collectionRepo.delete(id);
};

const deleteCollections = async (ids: number[]) => {
  const collectionRepo = getRepository(Collection);
  const collection = await collectionRepo
    .createQueryBuilder()
    .where(`id in :ids`)
    .setParameters({ ids: `(${ids.join(",")})` })
    .delete()
    .execute();
  return collection;
};

const collectionDaos = {
  createCollection,
  updateCollection,
  getCollectionById,
  deleteCollection,
  getCollections,
  deleteCollections,
};

export default collectionDaos;
