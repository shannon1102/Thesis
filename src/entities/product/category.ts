import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column({default: false})
  isDeleted?: boolean;

}
