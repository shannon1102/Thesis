import { MediaMap } from "../mediaMap";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import "reflect-metadata";
import { Media } from "../media";

import { User } from "../user";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  status?: string;

  @Column({ nullable: true })
  numFloors?: number;
  
  @Column({ nullable: true })
  numBedRooms?: number;

  @Column({ nullable: true })
  squaredMeterArea?: number;

  @Column({ nullable: true })
  lengthMeter?: number;

  @Column({ nullable: true })
  widthMeter?: number;

  @Column({ nullable: true })
  certificateOfland?: number;

  @Column({ default: "" })
  district?: string;

  
  @Column({ default: "" })
  ward?: string;
  
  @Column()
  houseType?: number;
  @Column()
  userId: number;
  @Column()
  price?: number;
  
  @Column()
  featureImageId?: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt?: Date;

  @OneToOne(() => Media, (media) => media.product)
  @JoinColumn({ name: "featureImageId", referencedColumnName: "id" })
  featureImage?: Media;

  @OneToMany(() => MediaMap, (mediaMap) => mediaMap.product)
  mediaMaps?: MediaMap[];


  @ManyToOne(() => User, (user) => user.products)
  user?: User;
  // custom field
  media?: Media[];
}
