import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { User } from "../user";
import { Post } from "./post";


@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User;
  
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "postId" })
  post?: Post;
}
