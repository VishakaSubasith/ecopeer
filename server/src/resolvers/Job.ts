import { Job } from "../entities/Job";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  PubSub,
  PubSubEngine,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { SolarPowerPlant } from "../entities/SolarPowerPlant";
import { JobStatus, PaymentStatus, UserType } from "../enums";
import { User } from "../entities/User";
import { SolarPowerPlantMaintainer } from "../entities/SolarPowerPlantMaintainer";
import { JobApplications } from "../entities/JobApplications";
import { PaymentTransaction } from "../entities/PaymentTransaction";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { finished } from "stream/promises";
import path from "path";
import { v4 } from "uuid";
import { JobFileInfo } from "../entities/JobFileInfo";
// import { IsNull } from "typeorm";
import { FavoriteJobs } from "../entities/FavoriteJobs";
import {
  sendJobApplicantSelectedEmail,
  sendJobApplicationEmail,
  sendJobFinishedByMaintainerEmail,
  sendJobOpenEmail,
  sendUpdateSuggestedPriceEmail,
} from "../utils/sendEmails";
import { getAdminEmails } from "../utils/getEmails";
import { AppNotification } from "../entities/AppNotification";
import { MoreThanOrEqual } from "typeorm";

@InputType()
class JobInput {
  @Field()
  title!: string;

  @Field()
  category!: string;

  @Field()
  shortDescription!: string;

  @Field()
  longDescription!: string;

  @Field()
  location!: string;

  @Field()
  applicationDeadline!: Date;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field()
  budget!: number;

  @Field()
  status!: JobStatus;

  @Field()
  solarPowerPlantId!: number;

  @Field({ nullable: true })
  suggestedPrice?: number;

  @Field(() => GraphQLUpload, { nullable: true })
  jobImage1?: Promise<FileUpload>;

  @Field(() => GraphQLUpload, { nullable: true })
  jobImage2?: Promise<FileUpload>;

  @Field(() => GraphQLUpload, { nullable: true })
  jobImage3?: Promise<FileUpload>;

  @Field(() => GraphQLUpload, { nullable: true })
  jobImage4?: Promise<FileUpload>;
}

@InputType()
class UpdateApplicationDeadlineInput {
  @Field()
  jobId: number;

  @Field()
  applicationDeadline!: Date;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}

@InputType()
class IsFavoriteInput {
  @Field()
  jobId: number;
}

@InputType()
class JobDeleteAdminInput {
  @Field()
  jobId: number;
}

@ObjectType()
class JobInfo {
  @Field()
  jobApplication: JobApplications;

  @Field()
  isFavorite: boolean;
}

@ObjectType()
class JobApplicationsResponse {
  @Field(() => [JobInfo])
  jobApplications: JobInfo[];
}

@Resolver()
export class JobResolver {
  // Queries
  @Query(() => [Job])
  async jobs(): Promise<Job[]> {
    return Job.find({
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
        "approvedApplicant",
        "approvedApplicant.user",
      ],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => [Job])
  async allJobs(): Promise<Job[]> {
    return Job.find({
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
        "approvedApplicant",
        "approvedApplicant.user",
      ],
      order: { createdAt: "DESC" },
      withDeleted: true,
    });
  }

  @Query(() => [Job])
  mapOpenJobs(): Promise<Job[]> {
    const currentDate = new Date();
    console.log({ currentDate });
    return Job.find({
      where: {
        status: JobStatus.Open,
        applicationDeadline: MoreThanOrEqual(currentDate),
      },
      relations: ["solarPowerPlant"],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => [Job])
  ownerJobs(@Ctx() { req }: MyContext): Promise<Job[]> {
    const userId = req.session.userId;
    return Job.createQueryBuilder()
      .where("user.id = :id", { id: userId })
      .innerJoinAndSelect("Job.solarPowerPlant", "solarPowerPlant")
      .innerJoin("solarPowerPlant.solarPowerPlantOwner", "solarPowerPlantOwner")
      .innerJoin("solarPowerPlantOwner.user", "user")
      .leftJoinAndSelect("Job.approvedApplicant", "approvedApplicant")
      .orderBy("Job.createdAt", "DESC")
      .getMany();
  }

  @Query(() => [Job])
  openJobs(): Promise<Job[]> {
    const currentDate = new Date();
    console.log({ currentDate });
    return Job.find({
      where: {
        status: JobStatus.Open,
        applicationDeadline: MoreThanOrEqual(currentDate),
      },
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
        "solarPowerPlant.region",
      ],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => Job)
  showApplicants(@Arg("jobId") jobId: number): Promise<Job> {
    return Job.findOneOrFail({
      where: { id: jobId },
      relations: [
        "jobApplications",
        "jobApplications.solarPowerPlantMaintainer",
        "jobApplications.solarPowerPlantMaintainer.user",
      ],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => [Job])
  async approvedJobs(@Ctx() { req }: MyContext): Promise<Job[]> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["solarPowerPlantMaintainer"],
    });
    const maintainer = await SolarPowerPlantMaintainer.findOneOrFail({
      where: { id: user.solarPowerPlantMaintainer.id },
      relations: ["jobApplications", "jobApplications.job"],
    });
    const jobs = maintainer.jobApplications.map(
      (application) => application.job
    );
    return jobs;
  }

  // Job applications
  @Query(() => JobApplicationsResponse)
  async jobApplications(
    @Ctx() { req }: MyContext
  ): Promise<JobApplicationsResponse> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["solarPowerPlantMaintainer"],
    });

    const jobs = await JobApplications.createQueryBuilder()
      .where("JobApplications.solarPowerPlantMaintainerId = :id", {
        id: user.solarPowerPlantMaintainer.id,
      })
      .andWhere(
        "(job.approvedApplicant.id = :id OR job.approvedApplicant.id IS NULL)",
        { id: user.solarPowerPlantMaintainer.id }
      )
      .leftJoinAndSelect("JobApplications.job", "job")
      .leftJoinAndSelect("job.jobFavorites", "jobFavorites")
      .orderBy("JobApplications.createdAt", "DESC")
      .getMany();
    // const jobs = await JobApplications.find({
    //   where: {
    //     solarPowerPlantMaintainerId: user.solarPowerPlantMaintainer.id,
    //     job: { approvedApplicant: user.solarPowerPlantMaintainer },
    //   },
    //   relations: ["job", "job.jobFavorites"],
    // });

    const jobApplications = {
      jobApplications: jobs.map((job) => ({
        jobApplication: job,
        isFavorite:
          job.job.jobFavorites.filter(
            (favs) =>
              favs.jobId === job.jobId &&
              favs.solarPowerPlantMaintainerId ===
                user.solarPowerPlantMaintainer.id
          ).length > 0
            ? true
            : false,
      })),
    };

    return jobApplications;
  }

  @Query(() => Job)
  job(@Arg("jobId") jobId: number): Promise<Job> {
    return Job.findOneOrFail({
      where: { id: jobId },
      relations: [
        "jobFiles",
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
      ],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => [FavoriteJobs])
  async favoriteJobs(@Ctx() { req }: MyContext): Promise<FavoriteJobs[]> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId, {
      relations: ["solarPowerPlantMaintainer"],
    });

    return FavoriteJobs.find({
      where: { solarPowerPlantMaintainerId: user.solarPowerPlantMaintainer.id },
      relations: ["job"],
      order: { createdAt: "DESC" },
    });
  }

  @Query(() => Boolean)
  async isMaintainerFavoriteJob(
    @Ctx() { req }: MyContext,
    @Arg("input") input: IsFavoriteInput
  ): Promise<boolean> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId, {
      relations: ["solarPowerPlantMaintainer"],
    });

    const favoriteJob = await FavoriteJobs.findOne({
      where: {
        solarPowerPlantMaintainerId: user.solarPowerPlantMaintainer.id,
        jobId: input.jobId,
      },
      order: { createdAt: "DESC" },
    });

    const isFavorite = favoriteJob ? true : false;
    return isFavorite;
  }

  // Mutations

  @Mutation(() => Job)
  @UseMiddleware(isAuth)
  async createJob(@Arg("input") input: JobInput): Promise<Job> {
    const solarPowerPlant = await SolarPowerPlant.findOne(
      input.solarPowerPlantId
    );
    input.suggestedPrice = input.budget;

    let jobFiles = [];
    // Write the file to disk
    const baseLocation = path.resolve("./public/images/");
    const jobImages = [
      input.jobImage1,
      input.jobImage2,
      input.jobImage3,
      input.jobImage4,
    ];
    console.log(input);
    console.log(jobImages);
    for (const fileInfo of jobImages) {
      if (fileInfo) {
        const { createReadStream, filename } = await fileInfo;
        const stream = createReadStream();
        const fileId = v4() + filename;
        const baseDir = path.join(baseLocation, "jobData");
        if (!existsSync(baseDir)) {
          mkdirSync(baseDir, { recursive: true });
        }
        const location = path.join(baseDir, fileId);
        console.log("LOcation", location);
        const out = createWriteStream(location);
        stream.pipe(out);
        await finished(out);

        // Create a new file
        const newFile = await JobFileInfo.create({
          filename: filename,
          storageLocation: `https://api.ecopeer.net/images/jobData/${fileId}`,
        }).save();
        console.log("Created new file:", newFile);
        jobFiles.push(newFile);
      }
    }

    console.log("Job files", jobFiles);
    const newJob = Job.create({
      ...input,
      solarPowerPlant: solarPowerPlant,
    });

    console.log("newJOB", newJob);
    newJob.jobFiles = jobFiles;
    console.log("newJOB", newJob);

    return newJob.save();
  }

  @Mutation(() => Job)
  async openJob(
    @Arg("jobId") jobId: number,
    @Ctx() { req }: MyContext
  ): Promise<Job> {
    const job = await Job.findOneOrFail(jobId);
    job.status = JobStatus.Open;
    await job.save();
    const userId = req.session.userId;
    const owner = await User.findOneOrFail(userId);
    const ownerEmail = owner.email;
    const maintainers = await User.find({
      where: { userType: UserType.Maintainer },
      select: ["email"],
    });
    const maintainerEmails = maintainers.map((m) => m.email);
    // const adminEmails = await getAdminEmails();
    sendJobOpenEmail(ownerEmail, maintainerEmails, ["info@ecopeer.net"], job.title);
    return job;
  }

  @Mutation(() => Job)
  async registerJob(@Arg("jobId") jobId: number): Promise<Job> {
    const job = await Job.findOneOrFail(jobId);
    job.status = JobStatus.Registered;
    return job.save();
  }

  @Mutation(() => Job)
  async editJob(
    @Arg("jobId") jobId: number,
    @Arg("input") input: JobInput
  ): Promise<Job> {
    const job = await Job.findOneOrFail(jobId);
    const solarPowerPlant = await SolarPowerPlant.findOne(
      input.solarPowerPlantId
    );
    input.suggestedPrice = input.budget;
    console.log(job);
    job.title = input.title;
    job.category = input.category;
    job.shortDescription = input.shortDescription;
    job.longDescription = input.longDescription;
    job.location = input.location;
    job.applicationDeadline = input.applicationDeadline;
    job.startDate = input.startDate;
    job.endDate = input.endDate;
    job.budget = input.budget;
    job.status = input.status;
    if (solarPowerPlant) {
      job.solarPowerPlant = solarPowerPlant;
    }
    return job.save();
  }

  @Mutation(() => Job)
  async addApplicant(
    @Arg("jobId") jobId: number,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Job> {
    const userId = req.session.userId;

    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["solarPowerPlantMaintainer"],
    });
    const maintainer = await SolarPowerPlantMaintainer.findOneOrFail(
      user.solarPowerPlantMaintainer.id
    );
    const job = await Job.findOneOrFail({
      where: { id: jobId },
      relations: [
        "jobApplications",
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
      ],
    });

    if (!job.jobApplications) {
      job.jobApplications = [];
    }

    const jobApplication = await JobApplications.findOne({
      where: {
        jobId,
        solarPowerPlantMaintainerId: user.solarPowerPlantMaintainer.id,
      },
    });

    if (jobApplication) {
      return job;
    }

    const newJobApplication = await JobApplications.create({
      jobId: job.id,
      job: job,
      solarPowerPlantMaintainerId: maintainer.id,
      solarPowerPlantMaintainer: maintainer,
      suggestedPrice: job.budget,
    }).save();
    job.jobApplications = [...job.jobApplications, newJobApplication];

    const owner = job.solarPowerPlant.solarPowerPlantOwner?.user;
    const adminEmails = await getAdminEmails();
    sendJobApplicationEmail(
      owner?.email || "",
      user.email,
      adminEmails,
      job,
      maintainer
    );
    const notification = await AppNotification.create({
      content: `No:${job.id}「${job.title}」に${user.solarPowerPlantMaintainer.name}さんが${job.budget}円で、応募しました。チャットで詳細を打ち合わせし、発注先を選んでください。`,
      user: owner,
    }).save();
    console.log({ notification });
    await pubSub.publish("NEW_NOTIFICATION", notification);
    return job.save();
  }

  @Mutation(() => PaymentTransaction)
  async approveApplicant(
    @Arg("jobId") jobId: number,
    @Arg("maintainerId") maintainerId: number
  ): Promise<PaymentTransaction> {
    const maintainer = await SolarPowerPlantMaintainer.findOneOrFail(
      maintainerId,
      { relations: ["user"] }
    );
    const job = await Job.findOneOrFail(jobId);
    job.approvedApplicant = maintainer;
    job.status = JobStatus.TempPayment;
    job.save();
    const jobApplication = await JobApplications.findOneOrFail({
      where: { jobId: jobId, solarPowerPlantMaintainerId: maintainerId },
    });

    const owner = await Job.createQueryBuilder()
      .where("Job.id = :id", { id: jobId })
      .innerJoin("Job.solarPowerPlant", "solarPowerPlant")
      .innerJoin("solarPowerPlant.solarPowerPlantOwner", "solarPowerPlantOwner")
      .innerJoinAndSelect("solarPowerPlantOwner.user", "user")
      .getOneOrFail();

    const maintainerEmail = maintainer.user.email;
    const ownerEmail =
      owner.solarPowerPlant.solarPowerPlantOwner?.user.email || "";
    const adminEmails = await getAdminEmails();

    sendJobApplicantSelectedEmail(
      ownerEmail,
      maintainerEmail,
      adminEmails,
      job.id,
      job.title,
      maintainer.name
    );
    await AppNotification.create({
      content: `選ばれた業者へ　No:${job.id}「${job.title}」に${maintainer.name}さんが選ばれました。`,
      user: maintainer,
    }).save();

    return PaymentTransaction.create({
      job,
      status: PaymentStatus.Pending,
      amount: jobApplication.suggestedPrice,
    }).save();
  }

  @Mutation(() => Job)
  async jobMarkCompleted(@Arg("jobId") jobId: number): Promise<Job> {
    const job = await Job.findOneOrFail(jobId, {
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
        "approvedApplicant",
        "approvedApplicant.user",
      ],
    });
    job.status = JobStatus.OrdererEvaluation;
    await job.save();
    const ownerEmail =
      job.solarPowerPlant.solarPowerPlantOwner?.user.email || "";
    const maintainerEmail = job.approvedApplicant.user.email;
    const adminEmails = await getAdminEmails();

    sendJobFinishedByMaintainerEmail(
      ownerEmail,
      maintainerEmail,
      adminEmails,
      job.id,
      job.title,
      job.approvedApplicant.name
    );
    const content = `No:${job.id}「${job.title}」の仕事の完了報告が${job.approvedApplicant.name}さんからありました。仕事の完了を確認後、発注者評価をしてください。評価後は${job.approvedApplicant.name}さんへ代金が支払われます。`;
    await AppNotification.create({
      content,
      user: job.solarPowerPlant.solarPowerPlantOwner?.user,
    }).save();
    return job;
  }

  @Mutation(() => Job)
  async jobCompleted(@Arg("jobId") jobId: number): Promise<Job> {
    const job = await Job.findOneOrFail(jobId);
    job.status = JobStatus.Completed;
    return job.save();
  }

  @Mutation(() => JobApplications)
  async updateSuggestedPrice(
    @Arg("jobId") jobId: number,
    @Arg("suggestedPrice") suggestedPrice: number,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext
  ): Promise<JobApplications> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["solarPowerPlantMaintainer"],
    });
    const application = await JobApplications.findOneOrFail({
      where: {
        jobId,
        solarPowerPlantMaintainerId: user.solarPowerPlantMaintainer.id,
      },
      relations: [
        "job",
        "job.solarPowerPlant",
        "job.solarPowerPlant.solarPowerPlantOwner",
        "job.solarPowerPlant.solarPowerPlantOwner.user",
      ],
    });
    // Send email
    const owner = application.job.solarPowerPlant.solarPowerPlantOwner?.user;
    application.suggestedPrice = suggestedPrice;
    const adminEmails = await getAdminEmails();
    sendUpdateSuggestedPriceEmail(
      owner?.email || "",
      user.email,
      adminEmails,
      application.job,
      suggestedPrice,
      user.solarPowerPlantMaintainer
    );
    // Send notification
    const job = application.job;
    const notification = await AppNotification.create({
      content: `No:${job.id}「${job.title}」に${user.solarPowerPlantMaintainer.name}さんが${suggestedPrice}円で、応募しました。チャットで詳細を打ち合わせし、発注先を選んでください。`,
      user: owner,
    }).save();
    console.log({ notification });

    await pubSub.publish("NEW_NOTIFICATION", notification);
    return application.save();
  }

  @Mutation(() => Boolean)
  async addJobToFavorite(
    @Arg("jobId") jobId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["solarPowerPlantMaintainer"],
    });
    const maintainer = await SolarPowerPlantMaintainer.findOneOrFail(
      user.solarPowerPlantMaintainer.id
    );
    const job = await Job.findOneOrFail(jobId);

    await FavoriteJobs.create({
      solarPowerPlantMaintainerId: maintainer.id,
      solarPowerPlantMaintainer: maintainer,
      jobId: job.id,
      job: job,
    }).save();

    return true;
  }

  @Mutation(() => Boolean)
  async removeJobFromFavorite(@Arg("jobId") jobId: number): Promise<boolean> {
    await FavoriteJobs.delete({ jobId });
    return true;
  }

  @Mutation(() => Boolean)
  async updateApplicationDeadline(
    @Ctx() { req }: MyContext,
    @Arg("input") input: UpdateApplicationDeadlineInput
  ): Promise<Boolean> {
    let result = false;
    const res = await Job.update(input.jobId, {
      applicationDeadline: input.applicationDeadline,
      startDate: input.startDate,
      endDate: input.endDate,
      status: JobStatus.Open,
    });
    if (res.affected && res.affected > 0) {
      result = true;
    }
    const job = await Job.findOneOrFail(input.jobId);

    if (result) {
      // Send email
      const userId = req.session.userId;
      const owner = await User.findOneOrFail(userId);
      const ownerEmail = owner.email;
      const maintainers = await User.find({
        where: { userType: UserType.Maintainer },
        select: ["email"],
      });
      const maintainerEmails = maintainers.map((m) => m.email);
      // const adminEmails = await getAdminEmails();
      sendJobOpenEmail(ownerEmail, maintainerEmails, [], job.title);
    }

    return result;
  }

  @Mutation(() => Boolean)
  async jobDeleteAdmin(@Arg("input") input: JobDeleteAdminInput) {
    const job = await Job.findOneOrFail(input.jobId, {
      relations: [
        "jobApplications",
        "jobFavorites",
        "jobFiles",
        "paymentTransactions",
      ],
    });
    for (const application of job.jobApplications) {
      await application.remove();
    }
    for (const favorite of job.jobFavorites) {
      await favorite.remove();
    }
    for (const jobFile of job.jobFiles) {
      await jobFile.remove();
    }
    await job.softRemove();
    return true;
  }
}
