import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Channel } from "./Channel";
import { FileInfo } from "./FileInfo";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  senderId: number;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel;

  @Field(() => FileInfo, { nullable: true })
  @OneToOne(() => FileInfo)
  @JoinColumn()
  uploadedFile: FileInfo;

  @Field(() => Boolean)
  @Column({ default: false })
  isRead: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
