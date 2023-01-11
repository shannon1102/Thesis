import { MediaMap } from "../mediaMap";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import "reflect-metadata";
import { Media } from "../media";
import { Option } from "../product/option";
import { User } from "../user";
import { Comment } from "./comment";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  status?: string;

  @Column({ default: 0 })
  price?: number;

  @Column({ default: 0 })
  comparePrice?: number;

  @Column()
  featureImageId?: number;

  @Column()
  url?: string;

  @Column()
  bestSelling?: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts)
  userId: User

  @OneToOne(() => Media, (media) => media.product)
  @JoinColumn({ name: "featureImageId", referencedColumnName: "id" })
  featureImage?: Media;

  @OneToMany(() => MediaMap, (mediaMap) => mediaMap.product)
  mediaMaps?: MediaMap[];
  
  @OneToMany(() => Comment, (comment) => comment.post) comments?: Comment[];
  @OneToMany(() => Option, (option) => option.product)
  options?: Option[];

  // custom field
  media?: Media[];

  @ManyToOne(() => User, (user) => user.products)
  user?: User;




}
