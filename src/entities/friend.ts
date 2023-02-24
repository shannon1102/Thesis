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
  addresseeId: number;

  @Column()
  requesterId: number;

  @Column()
  statusCode: number;

  @ManyToOne(() => User, (user) => user.requesterFriendList)
  @JoinColumn({ name: "requesterId" })
  requester: User;

  @ManyToOne(() => User, (user) => user.addresseeFriendList)
  @JoinColumn({ name: "addresseeId" })
  addressee: User;

}
