import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import "reflect-metadata";
import { Product } from "./product/product";
import { MediaMap } from "./mediaMap";
@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  link?: string;

  @Column()
  type?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP", select: false })
  updatedAt?: Date;

  @OneToOne(() => Product, (product) => product.featureImage)
  product?: Product;

  @OneToOne(() => Product, (product) => product.featureImage)
  post?: Product;

  @OneToMany(() => MediaMap, (mediaMap) => mediaMap.media)
  mediaMaps?: MediaMap[];

}
