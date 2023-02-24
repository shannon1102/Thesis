
import { Media } from "../../entities/media";
import { MediaMap } from "../../entities/mediaMap";
import { Product } from "../../entities/product/product";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import { ProductResponse } from "../../types/type.product";

/**
 * formatProductResponse: format response cho các apis product
 * @param product data cần format
 * @param condition.disableOptions có bỏ options trong response hay không?
 * @param condition.disableVariants có bỏ variants trong response hay không?
 * @returns
 */
const formatProductResponse = (product: Product, condition?: { disableOptions?: boolean; disableVariants?: boolean; disableFormatVariant?: boolean }): ProductResponse => {
  const currentProduct: Product = JSON.parse(JSON.stringify(product));
  // format options
  // format media
  let formatMediaProd =
    currentProduct.mediaMaps?.map((mediaMap: MediaMap) => {
      return mediaMap.media;
    }) || [];
  formatMediaProd = formatMedia(currentProduct.featureImage, formatMediaProd);
  // format variants
  

  // format product
  delete currentProduct.mediaMaps;
  delete currentProduct.featureImageId;

  const formatProduct: ProductResponse = {
    ...currentProduct,

    media: formatMediaProd

  };
  return formatProduct;
};

/**
 * formatMedia đưa featureImage lên đầu trong list media
 * @param featureImage featureImage
 * @param media list media
 * @returns list media đã format
 */
const formatMedia = (featureImage: Media, media: Media[]) => {
  if (featureImage && media) {
    return [featureImage, ...media.filter((item: Media) => item?.id !== featureImage?.id)];
  }
  return media;
};

/**
 * checkProductMedia check xem featureImage có trong list media hay không
 * @param media list media
 * @param featureImageId  featureImageId
 */
const checkProductMedia = (media: Media[], featureImageId: number) => {
  if (!media.find((item) => item.id === featureImageId)) {
    throw new CustomError(codes.BAD_REQUEST, "Feature image id should have in media list!");
  }
};

const productHelpers = { formatProductResponse, checkProductMedia };

export default productHelpers;
