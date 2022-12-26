import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Collection } from "./collection";
import { Product } from "./product";

@Entity()
export class ProductCollection {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  productId?: number;

  @Column()
  collectionId?: number;

  @ManyToOne(() => Collection, (collection) => collection.productCollections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "collectionId", referencedColumnName: "id" })
  collection?: Collection;

  @ManyToOne(() => Product, (product) => product.productCollections, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product?: Product;
}
