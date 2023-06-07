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
import { City } from "./City";
import { Job } from "./Job";
import { Region } from "./Region";
import { SolarPowerPlantOwner } from "./SolarPowerPlantOwner";

@ObjectType({ simpleResolvers: true })
@Entity()
export class SolarPowerPlant extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  officialId: string;

  @Field()
  @Column({ default: "発電所名" })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "double precision" })
  totalPowerOutput: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  classification: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "double precision" })
  lat: number;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "double precision" })
  lng: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  linked: boolean;

  @Field(() => SolarPowerPlantOwner, { nullable: true })
  @ManyToOne(
    () => SolarPowerPlantOwner,
    (solarPowerPlantOwner) => solarPowerPlantOwner.solarPowerPlants,
    { nullable: true }
  )
  solarPowerPlantOwner: SolarPowerPlantOwner | null;

  @Field(() => SolarPowerPlantOwner, { nullable: true })
  @ManyToOne(
    () => SolarPowerPlantOwner,
    (officalOwner) => officalOwner.solarPowerPlants,
    { nullable: true }
  )
  officialSolarPowerPlantOwner: SolarPowerPlantOwner | null;

  @Field(() => City, { nullable: true })
  @ManyToOne(() => City, (city) => city.solarPowerPlants)
  city: City;

  @Field(() => Region)
  @ManyToOne(() => Region, (region) => region.solarPowerPlants)
  region: Region;

  @Field(() => [Job])
  @OneToMany(() => Job, (job) => job.solarPowerPlant)
  jobs: Job[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
