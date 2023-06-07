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
import { Job } from "./Job";

@ObjectType()
@Entity()
export class JobFileInfo extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  filename: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  mimetype: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  encoding: string;

  @Field()
  @Column()
  storageLocation: string;

  @Field(() => Job)
  @ManyToOne(() => Job, (job) => job.jobFiles)
  job: Job;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
