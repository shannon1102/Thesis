import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deposit } from "./deposit/deposit";
import { UserMeta } from "./userMeta";
import { Post } from "./post/post";
import { Product } from "./product/product";
import { Comment } from "./post/comment";
import { Friend } from "./friend";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: true })
  avatar?: number | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  sex?: string;
  
  @Column()
  age?:number;

  @Column({ type: "enum", default: "user" })
  role?: "admin" | "user";

  @Column({ nullable: true })
  deviceId?: string | null;

  @OneToMany(() => Post, (post) => post.user) posts?: Post[];
  @OneToMany(() => Product, (product) => product.user) products?: Product[];
  @OneToMany(() => Comment, (comment) => comment.user) comments?: Comment[];
  // @OneToMany(() => Deposit, (deposit) => deposit.userId) deposits?: Deposit[];
  @OneToMany(() => UserMeta, (userMeta) => userMeta.user) userMetas?: UserMeta[];
  @OneToMany(() => Friend, (requesterFriendList) => requesterFriendList.requester) requesterFriendList?: Friend[];
  @OneToMany(() => Friend, (addresseeFriendList) => addresseeFriendList.requester) addresseeFriendList?: Friend[];
}
