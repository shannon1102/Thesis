
import { Media } from "../entities/media";
import { Pagination } from "./type.pagination";

export type OptionProductResponse = {
  id?: number;
  title?: string;
  position?: number;
  values?: string[];
};

export type ProductResponse = {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  vendorId?: number;
  price?: number;
  comparePrice?: number;
  featureImageId?: number;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  featureImage?: Media;
  options?: OptionProductResponse[];
  media?: Media[];
};

export type ProductSearchParams = {
  title?: string;
  status?: string;
  collectionId?: number;
  vendorId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortPrice?: "DESC" | "ASC";
  pagination?: Pagination;
  createdAt?: "DESC" | "ASC";
  bestSelling?: boolean;
};
