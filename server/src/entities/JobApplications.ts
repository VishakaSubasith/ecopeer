import { JobStatus } from "../enums";
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
import { SolarPowerPlantMaintainer } from "./SolarPowerPlantMaintainer";
import { Job } from "./Job";

registerEnumType(JobStatus, {
  name: "JobStatus",
});

@ObjectType()
@Entity()
export class JobApplications extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: number;

  @Field(() => Job)
  @ManyToOne(() => Job, (job) => job.jobApplications)
  job: Job;

  @Column()
  solarPowerPlantMaintainerId: number;

  @Field(() => SolarPowerPlantMaintainer)
  @ManyToOne(() => SolarPowerPlantMaintainer, (maintainer) => maintainer.jobApplications)
  solarPowerPlantMaintainer: SolarPowerPlantMaintainer;

  @Field()
  @Column()
  suggestedPrice: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
