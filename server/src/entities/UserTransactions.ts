import { PaymentStatus } from "../enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
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

registerEnumType(PaymentStatus, {
  name: "PaymentStatus",
});

@ObjectType()
@Entity()
export class UserTransaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  transactionId: string;

  @Field()
  @Column()
  price: number;

  @Field(() => PaymentStatus)
  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.Proccessing })
  status: PaymentStatus;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userTransactions)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
