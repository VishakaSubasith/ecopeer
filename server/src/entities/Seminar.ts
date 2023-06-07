import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Seminar extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @Field()
  @Column()
  dateAndTime: Date;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ type: "double precision", nullable: true })
  lat: number;

  @Field()
  @Column({ type: "double precision", nullable: true })
  lng: number;

  @Field()
  @Column()
  venue: string;

  @Field()
  @Column()
  access: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  form: string;

  @Field()
  @Column()
  belongings: string;

  @Field()
  @Column()
  clothing: string;

  @Field()
  @Column()
  precautions: string;

  @Field()
  @Column()
  cacellationRules: string;

  @Field()
  @Column()
  content: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
