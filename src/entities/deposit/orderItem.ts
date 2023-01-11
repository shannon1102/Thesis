import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import "reflect-metadata";
import { Order } from "./order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  price?: number;
  @Column()
  comparePrice?: number;

  @Column()
  quantity?: number;
  @Column()
  orderId?: number;
  @Column()
  variantId?: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order?: Order;
}
