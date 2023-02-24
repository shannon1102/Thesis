import { MediaMap } from "../../entities/mediaMap";
import { Product } from "../../entities/product/product";
import { convertToSlug } from "../../utils/convertToSlug";
import productDaos from "./daos";
import configs from "../../configs";
import CustomError from "../../errors/customError";
import codes from "../../errors/codes";
import { Media } from "../../entities/media";
import mediaMapServices from "../mediaMap/services";

import { ProductResponse, ProductSearchParams } from "../../types/type.product";
import productHelpers from "./helpers";

/**
 * createProduct service tạo product
 * @param product data product
 * @returns ProductReponse
 */
const createProduct = async (product: Product): Promise<ProductResponse> => {

  if (product.featureImageId && product.media) {
    productHelpers.checkProductMedia(product.media, product.featureImageId);
  }
  const productData: Product = product;
//   if (!productData.url) {
//     const countProductByUrl: number = await productDaos.countProducts({ title: productData.title });
//     if (countProductByUrl) {
//       productData.url = convertToSlug(productData.title + " " + countProductByUrl);
//     } else {
//       productData.url = convertToSlug(productData.title);
//     }
//   }
  // cache lai media
  const cacheMedia = product.media;
  delete product.media;
  // create new product
  const newProduct = await productDaos.createProduct(productData);
  // create product_collection

  // auto create variants

//   await mediaMapServices.createMediaMaps(listCreateMediaMap);
  // return product with full info
  const currentProduct = await productDaos.getProductById(newProduct.id);
  return productHelpers.formatProductResponse(currentProduct);
};


/**
 * getProducts get products service
 * @param params.pagination {limit, offset}
 * @returns list products
 */
const getProducts = async (params: ProductSearchParams): Promise<{ products: ProductResponse[]; total: number }> => {
  const pagination = {
    limit: params?.pagination?.limit || configs.MAX_RECORDS_PER_REQ,
    offset: params?.pagination?.offset || 0,
  };
  const newParams = {
    ...params,
    pagination,
  };
  let result = await productDaos.getProducts(newParams);
  const formatProducts = result.products.map((product: Product) => {
    const formatProd = productHelpers.formatProductResponse(product, { disableOptions: true, disableVariants: false, disableFormatVariant: true });

    const returnProd = {
      ...formatProd,

    }
    return returnProd;
  });
  return {
    products: formatProducts,
    total: result.total,
  };
};

/**
 * getProductById
 * @param id id cua product
 * @returns product
 */
const getProductById = async (id: number): Promise<ProductResponse> => {
  const findProduct = await productDaos.getProductById(id);
  if (!findProduct) {
    throw new CustomError(codes.NOT_FOUND, "Product not found!");
  }
  return productHelpers.formatProductResponse(findProduct);
};

/**
 * updateProduct: update product
 * @param id id can update
 * @param data data can update
 * @returns
 */
const updateProduct = async (id: number, data: Product): Promise<ProductResponse> => {
  const findProduct = await productDaos.getProductById(id);
  delete data.id;
  // init update
  if (data.featureImageId && data.media) {
    productHelpers.checkProductMedia(data.media, data.featureImageId);
  }
  if (data.media && !data.featureImageId && !data.media.find((item) => item.id === findProduct.featureImageId)) {
    throw new CustomError(codes.BAD_REQUEST, "Feature image id should have in media list!");
  }
  if (data.featureImageId) {
    if (findProduct.featureImageId !== data.featureImageId) {
      findProduct.featureImageId && (await mediaMapServices.deleteMediaMapById(findProduct.featureImageId));
      mediaMapServices.createMediaMaps([
        {
          mediaId: data.featureImageId,
          targetType: "product",
          targetId: findProduct.id,
        },
      ]);
    }
  }
  if (data.media) {
    const formatProduct = productHelpers.formatProductResponse(findProduct);
    const currentMedia = formatProduct.media;
    const deleteMedia = currentMedia
      .filter((media: Media) => {
        return !data.media.find((item) => item.id === media.id);
      })
      .map((item: Media) => {
        return item.id;
      });
    const addMedia: MediaMap[] = data.media
      .filter((media: Media) => {
        return !currentMedia.find((item) => item.id === media.id) && media.id !== data.featureImageId;
      })
      .map((item: Media) => {
        return {
          mediaId: item.id,
          targetType: "product",
          targetId: findProduct.id,
        };
      });
    // delete media
    const listDeleteMediaMap: MediaMap[] = deleteMedia.map((item: number) => {
      return {
        mediaId: item,
        targetType: "product",
        targetId: id,
      };
    });
    await mediaMapServices.deleteMediaMaps(listDeleteMediaMap);
    // update media
    await mediaMapServices.createMediaMaps(addMedia);
    delete data.media;
  }

  if (JSON.stringify(data) !== "{}") {
    await productDaos.updateProduct(id, data);
  }
  return await getProductById(id);
};



/**
 * deleteProduct
 * @param id id can delete
 * @returns
 */
const deleteProduct = async (id: number) => {
  const findProduct = await getProductById(id);
  productDaos.deleteProduct(id);
  return findProduct;
};

/**
 * countProducts đếm xem có bn product
 * @param params.url url của product
 * @param params.title title của product
 * @returns total product
 */
const countProducts = async (params: { url?: string; title?: string }): Promise<number> => {
  const count: number = await productDaos.countProducts(params);
  return count;
};

const productServices = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  countProducts,
};

export default productServices;
