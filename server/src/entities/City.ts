import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Region } from "./Region";
import { SolarPowerPlant } from "./SolarPowerPlant";

@ObjectType()
@Entity()
export class City extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: "double precision" })
  lat: number;

  @Field()
  @Column({ type: "double precision" })
  lng: number;

  @Field(() => Region)
  @ManyToOne(() => Region, (region) => region.cities)
  region: Region;

  @OneToMany(() => SolarPowerPlant, (solarPowerPlant) => solarPowerPlant.city)
  solarPowerPlants: SolarPowerPlant[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
