import { Media } from "../entities/media";
import { Like } from "../entities/post/like";

export type PostCreateParamsType = {
  id?: number;
  description?: string;
  userId: number;
  status?: string;
};

export type PostUpdateParamsType = {
  description?: string;
  isDeleted?: boolean;
};

export type PostResponse = {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  media?: Media[];
  // productCollections?: ProductCollection[];
  like: number;
  comments: Comment[];
};
