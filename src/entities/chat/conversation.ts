import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { User } from "../user";
import { Message } from "./message";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstUserId: number;

  @Column()
  secondUserId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "firstUserId" })
  firstUser: User;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "secondUserId" })
  secondUser: User;

  @OneToMany(() => Message, (message) => message.conversation)
  @JoinColumn({ name: "firstUserId" })
  messages: Message[];
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;
  
}

