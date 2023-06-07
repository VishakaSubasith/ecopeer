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
import { SolarPowerPlantMaintainer } from "./SolarPowerPlantMaintainer";
import { Job } from "./Job";

@ObjectType()
@Entity()
export class FavoriteJobs extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: number;

  @Field(() => Job)
  @ManyToOne(() => Job, (job) => job.jobFavorites)
  job: Job;

  @Column()
  solarPowerPlantMaintainerId: number;

  @Field(() => SolarPowerPlantMaintainer)
  @ManyToOne(() => SolarPowerPlantMaintainer, (maintainer) => maintainer.favoriteJobs)
  solarPowerPlantMaintainer: SolarPowerPlantMaintainer;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
