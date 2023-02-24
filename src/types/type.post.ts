import { Media } from "../entities/media";
import { Like } from "../entities/post/like";

export type PostCreateParamsType = {
  id?: number;
  description?: string;
  userId: number;
  status?: string;
  media?: number[];
};

export type PostUpdateParamsType = {
  description?: string;
  isDeleted?: boolean;
  media?: number[];
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
  numLikes: number;
  isLiked: boolean;
  comments: Comment[];
};
