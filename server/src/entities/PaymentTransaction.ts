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
import { Job } from "./Job";

registerEnumType(PaymentStatus, {
  name: "PaymentStatus",
});

@ObjectType()
@Entity()
export class PaymentTransaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  transactionId: string;

  @Field()
  @Column()
  amount: number;

  @Field(() => PaymentStatus)
  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  status: PaymentStatus;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => Job)
  @ManyToOne(() => Job, (job) => job.paymentTransactions)
  job: Job;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
