import { Field, Int, ObjectType } from "type-graphql";
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
import { FavoriteJobs } from "./FavoriteJobs";
import { Job } from "./Job";
import { JobApplications } from "./JobApplications";
import { Representative } from "./Representative";
import { User } from "./User";

@ObjectType()
@Entity()
export class SolarPowerPlantMaintainer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  intro: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column({ type: "double precision" })
  lat: number;

  @Field()
  @Column({ type: "double precision" })
  lng: number;

  @Field(() => Representative)
  @OneToOne(() => Representative)
  @JoinColumn()
  representative: Representative;

  @Field(() => [JobApplications])
  @OneToMany(() => JobApplications, (applications) => applications.solarPowerPlantMaintainer)
  jobApplications: JobApplications[];

  @Field(() => [FavoriteJobs])
  @OneToMany(() => FavoriteJobs, (favoriteJob) => favoriteJob.solarPowerPlantMaintainer)
  favoriteJobs: FavoriteJobs[];

  @Field(() => [Job])
  @OneToMany(() => Job, (job) => job.approvedApplicant)
  approvedJobs: Job[]

  @Field(() => User)
  @OneToOne(() => User, (user) => user.solarPowerPlantMaintainer)
  user: User

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
