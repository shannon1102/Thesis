import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import "reflect-metadata";
import { Product } from "./product/product";
import { Media } from "./media";
import { Post } from "./post/post";

@Entity()
export class MediaMap {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true, select: false })
  targetId?: number;

  @Column({ nullable: true, select: false })
  targetType?: string;

  @Column({ nullable: true })
  mediaId?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", select: false })
  updatedAt?: Date;

  @ManyToOne(() => Product, (product) => product.mediaMaps)
  @JoinColumn({ name: "targetId", referencedColumnName: "id" })
  product?: Product;

  @ManyToOne(() => Post, (post) => post.mediaMaps)
  @JoinColumn({ name: "targetId", referencedColumnName: "id" })
  post?: Post;
  
  @ManyToOne(() => Media, (media) => media.mediaMaps)
  @JoinColumn({ name: "mediaId", referencedColumnName: "id" })
  media?: Media;
}
