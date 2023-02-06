import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { User } from "./user";


@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // @Column({default: false})
  // isDeleted: boolean;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: "friendId" })
  friendId: User;

}
