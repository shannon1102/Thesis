import { Request, Response } from "express";
import { Variant } from "../../entities/variant";
import variantServices from "./services";

const create = async (req: Request, res: Response) => {
  const { price, comparePrice, featureImageId, availableNumber, options } = req.body;
  const productId = req.params.productId;
  const dataVariant: Variant = {
    price,
    comparePrice,
    featureImageId,
    availableNumber,
    options,
    productId: Number(productId),
  };
  const newVariant = await variantServices.createVariant(dataVariant);
  res.status(200).json({
    status: "success",
    result: newVariant,
  });
};

const update = async (req: Request, res: Response) => {
  const { price, comparePrice, featureImageId, availableNumber, options } = req.body;
  const productId = req.params.productId;
  const id = req.params.id;
  const dataVariant: Variant = {
    price,
    comparePrice,
    featureImageId,
    availableNumber,
    options,
    productId: Number(productId),
  };
  const newVariant = await variantServices.updateVariant(Number(id), dataVariant);
  res.status(200).json({
    status: "success",
    result: newVariant,
  });
};

const deleteVariantById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedVariant = await variantServices.deleteVariantById(Number(id));
  res.status(200).json({
    status: "success",
    result: deletedVariant,
  });
};

const variantControllers = {
  create,
  update,
  deleteVariantById,
};

export default variantControllers;
