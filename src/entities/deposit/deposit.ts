import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import "reflect-metadata";
@Entity()
export class Deposit {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId?: number;
  @Column()
  price?: number;
  @Column()
  customerName: string;
  @Column()
  customerEmail: string;
  @Column()
  customerPhone: string;
  @Column()
  customerAddress: string;
  @Column()
  paymentMethod: string;
  @Column()
  status: string;
  
  @Column()
  productId: string
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  // @ManyToOne(() => User, (user) => user.Deposits)
  // @JoinColumn({ name: "userId", referencedColumnName: "id" })
  // user?: User;

  // @ManyToOne(() => Product, (product) => product.)
  // @JoinColumn({ name: "productId", referencedColumnName: "id" })
  // product?: Product;

}
