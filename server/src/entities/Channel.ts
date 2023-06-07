import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity, Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChannelsMembers } from "./ChannelsMembers";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [ChannelsMembers])
  @OneToMany(
    () => ChannelsMembers,
    (channelsMembers) => channelsMembers.channel
  )
  channelsMembers: ChannelsMembers[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Boolean)
  @Column()
  deleted : boolean
}
