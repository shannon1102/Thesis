import { getRepository } from "typeorm";
import { Pagination } from "../../types/type.pagination";
import { Cart } from "../../entities/cart";

const createCart = async (cartData: Cart): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const newCart = cartRepo.create(cartData);
  const cart = await cartRepo.save(newCart);
  return cart;
};

const getCartById = async (id: number): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const cart = await cartRepo
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.cartItems", "cartItems", "c.id=cartItems.cartId")
    .leftJoinAndSelect("cartItems.variant", "variant", "variant.id=cartItems.variantId")
    .leftJoinAndSelect("variant.product", "product", "variant.productId=product.id")
    .where(`c.id=${id}`)
    .getOne();
  return cart;
};

const getCartByUserId = async (userId: number): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const cart = await cartRepo
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.cartItems", "cartItems", "c.id=cartItems.cartId")
    .leftJoinAndSelect("cartItems.variant", "variant", "variant.id=cartItems.variantId")
    .leftJoinAndSelect("variant.product", "product", "variant.productId=product.id")
    .where(`c.userId=${userId}`)
    .getOne();
  return cart;
};

const getMyCart = async (userId: number): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const cart = await cartRepo
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.cartItems", "cartItems")
    .leftJoinAndSelect("cartItems.variant", "variant", "variant.id=cartItems.variantId")
    .leftJoinAndSelect("variant.product", "product", "variant.productId=product.id")
    .where(`c.userId=${userId}`)
    .getOne();
  return cart;
};
const checkCart = async (userId: number): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const cart = await cartRepo.findOne({ userId: userId });
  return cart;
};
const getCarts = async (params: { pagination: Pagination }): Promise<Cart[]> => {
  const CartRepo = getRepository(Cart);
  return await CartRepo.createQueryBuilder("c").leftJoinAndSelect("c.cartItems", "cartItems").skip(params.pagination.offset).take(params.pagination.limit).getMany();
};

const updateCart = async (id: number, cartData: Cart): Promise<Cart> => {
  const cartRepo = getRepository(Cart);
  const newUpdate = await cartRepo.update(id, cartData);
  return newUpdate.raw;
};

const deleteCart = async (id: number) => {
  const CartRepo = getRepository(Cart);
  await CartRepo.delete(id);
};

const CartDaos = {
  createCart,
  getCartById,
  getCarts,
  updateCart,
  deleteCart,
  getCartByUserId,
  getMyCart,
  checkCart,
};

export default CartDaos;
