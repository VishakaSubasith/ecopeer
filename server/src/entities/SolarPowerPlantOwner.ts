import { OwnerType } from "../enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SolarPowerPlant } from "./SolarPowerPlant";
import { User } from "./User";

registerEnumType(OwnerType, { name: "OwnerType" });

@ObjectType()
@Entity()
export class SolarPowerPlantOwner extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => OwnerType)
  @Column({
    type: "enum",
    enum: OwnerType,
    default: OwnerType.ManagementCompany,
  })
  ownerType: OwnerType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  companyName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  DOB: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column()
  address: string;

  @Field({ nullable: true })
  @Column({ type: "double precision", nullable: true })
  lat: number;

  @Field({ nullable: true })
  @Column({ type: "double precision", nullable: true })
  lng: number;

  @Field(() => [SolarPowerPlant])
  @OneToMany(
    () => SolarPowerPlant,
    (solarPowerPlant) => solarPowerPlant.solarPowerPlantOwner
  )
  solarPowerPlants: SolarPowerPlant[];

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.solarPowerPlantOwner)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
