import { MediaMap } from "../mediaMap";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import "reflect-metadata";
import { Media } from "../media";
import { User } from "../user";
import { Comment } from "./comment";
import { Like } from "./like";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ nullable: true })
  description?: string;
  // @Column()
  // status?: string;

  @Column()
  isDeleted?: boolean;

  // @Column()
  // url?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @Column()
  userId: number;


  @OneToMany(() => MediaMap, (mediaMap) => mediaMap.product)
  mediaMaps?: MediaMap[];
  
  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
  @OneToMany(() => Like, (like) => like.post) 
  likes?: Like[];
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  user?: User;
}
