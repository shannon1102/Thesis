import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { User } from "../user";
import { Post } from "./post";


@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @Column()
  userId: number;

  @Column()
  postId: number;
  
//   @ManyToOne(() => User, (user) => user.articles)
//   @JoinColumn({ name: "userId" })
//   user: User;
  
//   @ManyToOne(() => Post, (post) => post.articles)
//   @JoinColumn({ name: "userId" })
//   post: Post;
}
