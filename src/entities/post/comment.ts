import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { User } from "../user";
import { Post } from "./post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({default: false})
  isDeleted: boolean;

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
