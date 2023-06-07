import { JobStatus } from "../enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SolarPowerPlant } from "./SolarPowerPlant";
import { SolarPowerPlantMaintainer } from "./SolarPowerPlantMaintainer";
import { JobApplications } from "./JobApplications";
import { PaymentTransaction } from "./PaymentTransaction";
import { JobFileInfo } from "./JobFileInfo";
import { FavoriteJobs } from "./FavoriteJobs";

registerEnumType(JobStatus, {
  name: "JobStatus",
});

@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  shortDescription: string;

  @Field()
  @Column()
  longDescription: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  applicationDeadline: Date;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @Field()
  @Column()
  budget: number;

  @Field(() => JobStatus)
  @Column({ type: "enum", enum: JobStatus, default: JobStatus.Draft })
  status: JobStatus;

  @Field(() => [JobFileInfo])
  @OneToMany(() => JobFileInfo, (jobFileInfo) => jobFileInfo.job)
  jobFiles: JobFileInfo[];

  @Field(() => SolarPowerPlant)
  @ManyToOne(() => SolarPowerPlant, (solarPowerPlant) => solarPowerPlant.jobs)
  solarPowerPlant: SolarPowerPlant;

  @Field(() => [JobApplications], { nullable: true })
  @OneToMany(() => JobApplications, (applications) => applications.job)
  jobApplications: JobApplications[];

  @Field(() => [FavoriteJobs])
  @OneToMany(() => FavoriteJobs, (favoriteJobs) => favoriteJobs.job)
  jobFavorites: FavoriteJobs[];

  @Field(() => SolarPowerPlantMaintainer, { nullable: true })
  @ManyToOne(
    () => SolarPowerPlantMaintainer,
    (maintainer) => maintainer.approvedJobs
  )
  approvedApplicant: SolarPowerPlantMaintainer;

  @Field(() => [PaymentTransaction])
  @OneToMany(() => PaymentTransaction, (transaction) => transaction.job)
  paymentTransactions: PaymentTransaction[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String,{ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  updateExpiry() {
    let newDate : Date = new Date();
    newDate = new Date(newDate.setDate(newDate.getDate()+2))
    newDate = new Date(newDate.setHours(0,0,0,0))
    if (
      this.applicationDeadline < newDate &&
      (this.status === JobStatus.Draft ||
        this.status === JobStatus.Registered ||
        this.status === JobStatus.Open)
    ) {
      this.status = JobStatus.Expired;
      this.jobApplications = [];
    }
  }
}
