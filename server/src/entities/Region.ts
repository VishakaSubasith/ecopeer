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
import { Area } from "./Area";
import { City } from "./City";
import { SolarPowerPlant } from "./SolarPowerPlant";

@ObjectType({simpleResolvers: true})
@Entity()
export class Region extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Area)
  @ManyToOne(() => Area, (area) => area.regions)
  area: Area;

  @Field(() => [City])
  @OneToMany(() => City, (city) => city.region)
  cities: City[];

  @Field(() => [SolarPowerPlant])
  @OneToMany(() => SolarPowerPlant, (solarPowerPlant) => solarPowerPlant.region)
  solarPowerPlants: SolarPowerPlant[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
