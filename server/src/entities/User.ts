import { UserType, AccountType } from "../enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SolarPowerPlantMaintainer } from "./SolarPowerPlantMaintainer";
import { SolarPowerPlantOwner } from "./SolarPowerPlantOwner";
import { UserTransaction } from "./UserTransactions";
import { ChannelsMembers } from "./ChannelsMembers";
import { PaymentTransaction } from "./PaymentTransaction";

registerEnumType(UserType, {
  name: "UserType",
});

registerEnumType(AccountType, {
  name: "AccountType",
});

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => SolarPowerPlantOwner, { nullable: true })
  @OneToOne(() => SolarPowerPlantOwner)
  @JoinColumn()
  solarPowerPlantOwner: SolarPowerPlantOwner;

  @Field(() => SolarPowerPlantMaintainer, { nullable: true })
  @OneToOne(() => SolarPowerPlantMaintainer, (maintainer) => maintainer.user)
  @JoinColumn()
  solarPowerPlantMaintainer: SolarPowerPlantMaintainer;

  @Field(() => UserType)
  @Column({ type: "enum", enum: UserType, default: UserType.Unverified })
  userType: UserType;

  @Field(() => AccountType)
  @Column({ type: "enum", enum: AccountType, default: AccountType.Free })
  accountType: AccountType;

  @Field(() => [UserTransaction])
  @OneToMany(() => UserTransaction, (userTransaction) => userTransaction.user)
  userTransactions: UserTransaction[];

  @OneToMany(() => ChannelsMembers, (channelsMembers) => channelsMembers.user)
  channelsMembers: ChannelsMembers[];

  @Field(() => [PaymentTransaction])
  @OneToMany(() => PaymentTransaction, (payment) => payment.user)
  paymentTransactions: PaymentTransaction[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Boolean)
  @Column()
  hasverified: Boolean;

  @Field({nullable:true})
  @Column()
  withdrawal: String;
}
