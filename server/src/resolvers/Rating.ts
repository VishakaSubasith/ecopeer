import {Arg, Ctx, Field, InputType, Mutation, Query, Resolver,} from "type-graphql";
import {MyContext} from "../types";
import {User} from "../entities/User";
import {Rating} from "../entities/Rating";
import {Job} from "../entities/Job";
import {getAdminEmails} from "../utils/getEmails";
import {sendJobMaintainerRatingCompleteEmail, sendJobOwnerRatingCompleteEmail,} from "../utils/sendEmails";
import {AppNotification} from "../entities/AppNotification";
import {JobStatus} from "../enums";

@InputType()
class UserRatingInput {
  @Field()
  userId: number;
}

@InputType()
class RateOwnerInput {
  @Field()
  jobId: number;

  @Field()
  rating: number;

  @Field()
  comment: string;
}

@InputType()
class RateMaintainerInput {
  @Field()
  jobId: number;

  @Field()
  rating: number;

  @Field()
  comment: string;
}

@Resolver()
export class RatingResolver {
  @Query(() => [Rating])
  ratings(): Promise<Rating[]> {
    return Rating.find({ relations: ["user"] });
  }

  @Query(() => [Rating])
  async userRatings(@Arg("input") input: UserRatingInput): Promise<Rating[]> {
    const userId = input.userId;
    const user = await User.findOneOrFail(userId);
    return Rating.find({
      where: { evaluatee: user },
      relations: [
        "evaluatee",
        "evaluatee.solarPowerPlantOwner",
        "evaluatee.solarPowerPlantMaintainer",
        "evaluator",
        "evaluator.solarPowerPlantOwner",
        "evaluator.solarPowerPlantMaintainer",
      ],
    });
  }

  @Mutation(() => Rating)
  async rateOwner(
    @Ctx() { req }: MyContext,
    @Arg("input") input: RateOwnerInput
  ) {
    const userId = req.session.userId;
    const maintainer = await User.findOneOrFail(userId);

    const job = await Job.findOneOrFail(input.jobId, {
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
      ],
    });

    const owner = job.solarPowerPlant.solarPowerPlantOwner?.user;

    const rating = Rating.create({
      ...input,
      evaluator: maintainer,
      evaluatee: owner,
    }).save();

    const jobStatus = await Job.findOneOrFail((input.jobId));
    jobStatus.status = JobStatus.Completed;
    await jobStatus.save();

    // Send notifications
    const ownerEmail = owner?.email || "";
    const maintainerEmail = maintainer.email;
    const adminEmails = await getAdminEmails();

    sendJobOwnerRatingCompleteEmail(
      ownerEmail,
      maintainerEmail,
      adminEmails,
      job.id,
      job.title
    );
    const content = `No:${job.id}「${job.title}」の受注者が評価しました。仕事の全ステータスが完了しました。`;
    await AppNotification.create({
      content,
      user: owner,
    }).save();

    return rating;
  }

  @Mutation(() => Rating)
  async rateMaintainer(
    @Ctx() { req }: MyContext,
    @Arg("input") input: RateMaintainerInput
  ) {
    const userId = req.session.userId;
    const owner = await User.findOneOrFail(userId, {
      relations: ["solarPowerPlantOwner"],
    });

    const job = await Job.findOneOrFail(input.jobId, {
      relations: ["approvedApplicant", "approvedApplicant.user"],
    });

    const maintainer = job.approvedApplicant.user;

    const rating = Rating.create({
      ...input,
      evaluator: owner,
      evaluatee: maintainer,
    }).save();

    const jobStatus = await Job.findOneOrFail((input.jobId));
    jobStatus.status = JobStatus.ContractorEvaluation;
    await jobStatus.save();

    // Send Notifications
    const maintainerEmail = maintainer.email;
    const adminEmails = await getAdminEmails();

    sendJobMaintainerRatingCompleteEmail(
      maintainerEmail,
      adminEmails,
      job.id,
      job.title,
      job.approvedApplicant.name,
      owner.solarPowerPlantOwner.nickname
        ? owner.solarPowerPlantOwner.nickname
        : ""
    );
    const content = `No:${job.id}「${job.title}」の発注者が評価しました。受注者評価をしてください。`;

    await AppNotification.create({
      content,
      user: maintainer,
    }).save();

    return rating;
  }
}
