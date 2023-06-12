import argon2 from "argon2";
import {v4} from "uuid";

import {User} from "../entities/User";
import {Arg, Ctx, Field, Float, InputType, Int, Mutation, ObjectType, Query, Resolver,} from "type-graphql";
import {MyContext} from "src/types";
import {COOKIE_NAME, FORGET_PASSWORD_PREFIX, VERIFY_EMAIL_PREFIX,} from "../constants";
import {Not} from "typeorm";
import {JobStatus, UserType} from "../enums";
import {SolarPowerPlantOwner} from "../entities/SolarPowerPlantOwner";
import {Representative} from "../entities/Representative";
import {SolarPowerPlantMaintainer} from "../entities/SolarPowerPlantMaintainer";
import {sendContactUsEmail, sendEmail} from "../utils/sendEmails";
import {SolarPowerPlant} from "../entities/SolarPowerPlant";
import {Job} from "../entities/Job";
import {AppNotification} from "../entities/AppNotification";
import {ChannelsMembers} from "../entities/ChannelsMembers";
import {Channel} from "../entities/Channel";
import {JobFileInfo} from "../entities/JobFileInfo";

@InputType()
class EmailPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class CreateProfileInput {
  @Field()
  name: string;
  @Field()
  gender: string;
  @Field()
  DOB: Date;
  @Field()
  phoneNumber: string;
  @Field()
  address: string;
  @Field()
  owner: boolean;
  @Field()
  maintainer: boolean;
  @Field()
  companyName: string;
  @Field()
  companyIntro: string;
  @Field()
  companyPhoneNumber: string;
  @Field()
  companyAddress: string;
  @Field(() => Float)
  lat?: number;
  @Field(() => Float)
  lng?: number;
}

@InputType()
class RegistrationInput {
  @Field()
  email: string;
  @Field()
  password: string;
  //
  // @Field()
  // hasVerified: boolean;
}

@InputType()
class ResetPasswordInput {
  @Field()
  token: string;

  @Field()
  newPassword: string;
}

@InputType()
class ChangePasswordInput {
  @Field()
  userId: number;

  @Field()
  newPassword: string;
}

@InputType()
class VerifyEmailInput {
  @Field()
  token: string;
}

@InputType()
class UserCursor {
  @Field()
  createdAt: string;
}

@InputType()
class PaginationOptions {
  @Field()
  limit: number;

  @Field(() => UserCursor, { nullable: true })
  cursor?: UserCursor;
}

@InputType()
class UsersFilterInput {
  @Field(() => PaginationOptions)
  pagination: PaginationOptions;
}

@InputType()
class contactUsInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  classification: string;

  @Field()
  message: string;
}

@InputType()
class forceDeleteUserInput {
  @Field()
  userId: number;
}

@ObjectType()
class FieldError {
  @Field()
  field: String;

  @Field()
  message: String;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class BasicStatistic {
  @Field(() => Int)
  jobs: number;
  @Field(() => Int)
  powerplants: number;
  @Field(() => Int)
  users: number;
}

@ObjectType()
class StatisticsResponse {
  @Field(() => BasicStatistic)
  statistics: BasicStatistic;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne(req.session.userId);
    if (user?.hasverified)
    return user;
    else return null;
  }

  @Query(() => User, { nullable: true })
  async userDetails(@Arg("userId") userId: number) {
    const user = await User.findOne(userId, {
      relations: [
        "solarPowerPlantOwner",
        "solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer.representative",
        "paymentTransactions",
        "paymentTransactions.job",
      ],
    });
    console.log("user===>>",user)

    if (!user) {
      return null;
    }

    return user;
  }

  @Query(() => User, { nullable: true })
  async currentUserDetails(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    const user = await User.findOne(userId, {
      relations: [
        "solarPowerPlantOwner",
        "solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer.representative",
        "paymentTransactions",
        "paymentTransactions.job",
      ],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => Boolean)
  async updateUserType(
    @Arg("userType") userType: UserType,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    let user = await User.findOneOrFail(req.session.userId);
    user.userType = userType;
    await user.save();
    req.session.userId = user.id;
    return true;
  }

  @Query(() => [User])
  users(@Arg("input") input: UsersFilterInput): Promise<User[]> {
    const maxLimit = Math.min(50, input.pagination.limit);
    // const qb = User.createQueryBuilder()
    //   .orderBy('"User"."createdAt"', "DESC")
    //   .take(maxLimit);
    // if (input.pagination.cursor) {
    //   qb.where('"User"."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(input.pagination.cursor.createdAt)),
    //   });
    // }
    // qb.leftJoinAndSelect(
    //   "User.solarPowerPlantOwner",
    //   "solarPowerPlantOwner"
    // ).leftJoinAndSelect(
    //   "User.solarPowerPlantMaintainer",
    //   "solarPowerPlantMaintainer"
    // );

    // return qb.getMany();
    return User.find({
      relations: ["solarPowerPlantOwner", "solarPowerPlantMaintainer"],
      order: { createdAt: "DESC" },
      take: maxLimit,
    });
  }

  @Query(() => [User])
  messageUsers(@Ctx() { req }: MyContext): Promise<User[]> {
    return User.find({
      where: { id: Not(req.session.userId) },
      relations: ["solarPowerPlantOwner", "solarPowerPlantMaintainer"],
    });
  }

  @Query(() => StatisticsResponse)
  async statistics(): Promise<StatisticsResponse> {
    const users = await User.createQueryBuilder().getCount();
    const powerplants = await SolarPowerPlant.createQueryBuilder().getCount();
    const jobs = await Job.createQueryBuilder().getCount();
    console.log("Info", users, powerplants, jobs);
    return { statistics: { jobs, powerplants, users } };
  }

  @Mutation(() => UserResponse)
  async createProfile(
    @Ctx() { req }: MyContext,
    @Arg("input") input: CreateProfileInput
  ): Promise<UserResponse> {
    const userId = req.session.userId;
    let newUser = await User.findOneOrFail(userId);

    if (input.owner) {
      const powerPlantOwner = await SolarPowerPlantOwner.create({
        ...input,
      }).save();
      newUser.solarPowerPlantOwner = powerPlantOwner;
    }

    if (input.maintainer) {
      const powerPlantRepresentative = await Representative.create({
        ...input,
      }).save();

      const powerPlantMaintainer = await SolarPowerPlantMaintainer.create({
        name: input.companyName,
        address: input.companyAddress,
        phoneNumber: input.companyPhoneNumber,
        intro: input.companyIntro,
        lat: input.lat,
        lng: input.lng,
        representative: powerPlantRepresentative,
      }).save();

      newUser.solarPowerPlantMaintainer = powerPlantMaintainer;
    }

    if (input.owner && input.maintainer) {
      newUser.userType = UserType.OwnerMaintainer;
    } else if (input.owner) {
      newUser.userType = UserType.Owner;
    } else if (input.maintainer) {
      newUser.userType = UserType.Maintainer;
    }

    newUser = await newUser.save();
    req.session.userId = newUser.id;

    return {
      user: newUser,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: EmailPasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: input.email } });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "登録されていないメールアドレスです。",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, input.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "パスワードが間違っています",
          },
        ],
      };
    }

    if (
      user.userType !== UserType.Unverified &&
      user.userType !== UserType.PendingProfile
    ) {
      req.session.userId = user.id;
    }

    if (
        (user.userType === UserType.Unverified ||
        user.userType === UserType.PendingProfile || user.hasverified === false) && user.userType !== UserType.Admin
    ) {
      return {
        errors: [
          {
            field: "unverified",
            message: "You need to complete your profile !",
          },
        ],
      };
    }

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("userId") userId: number) {
    const user = await User.findOne(userId, {
      relations: ["solarPowerPlantOwner", "solarPowerPlantMaintainer"],
    });
    if (!user) {
      return false;
    }
    await user.remove();
    if (user.solarPowerPlantOwner) {
      await user.solarPowerPlantOwner.remove();
    }
    if (user.solarPowerPlantMaintainer) {
      await user.solarPowerPlantMaintainer.remove();
    }
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redisClient }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();
    const key = FORGET_PASSWORD_PREFIX + token;

    redisClient.set(key, user.id as unknown as string);

    const body = `<a href="https://ecopeer.net/reset-password/${token}">パスワード再設定</a>`;

    await sendEmail(user.email, "パスワード再設定", "", body);

    return true;
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg("input") input: ResetPasswordInput,
    @Ctx() { redisClient }: MyContext
  ): Promise<UserResponse> {
    const key = FORGET_PASSWORD_PREFIX + input.token;

    const getUserId = (key: string): Promise<string | null> => {
      return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
          if (err) {
            reject(err);
          }
          resolve(val);
        });
      });
    };

    const userId = await getUserId(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired.",
          },
        ],
      };
    }

    const user = await User.findOneOrFail(parseInt(userId));

    user.password = await argon2.hash(input.newPassword);
    await user.save();

    redisClient.del(key);

    // req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async changePassword(
      @Arg("input") input: ChangePasswordInput,
      // @Ctx() { redisClient, req }: MyContext
  ): Promise<UserResponse> {

    const userId =  input.userId

    const user = await User.findOneOrFail(parseInt(String(userId)));

    user.password = await argon2.hash(input.newPassword);
    await user.save();

    return { user };
  }


  @Mutation(() => UserResponse)
  async register(
    @Ctx() { redisClient }: MyContext,
    @Arg("input") input: RegistrationInput
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email: input.email } });

    if (user) {
      return {
        errors: [
          {
            field: "email",
            message: "既に登録されているメールアドレスです",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(input.password);

    let newUser = await User.create({
      email: input.email,
      password: hashedPassword,
      userType: UserType.Unverified,
      hasverified : false
    }).save();

    const token = v4();
    const key = VERIFY_EMAIL_PREFIX + token;

    redisClient.set(key, newUser.id as unknown as string);

    const body = `<p>ご本人確認のため、下記のリンクを押してください。</p> <a href="https://ecopeer.net/verify-email/${token}">エコピア　メールアドレス認証</a>`;

    console.log({ body });
    await sendEmail(newUser.email, "メールアドレスの承認をする", "", body);

    return {
      user: newUser,
    };
  }

  @Mutation(() => UserResponse)
  async verifyEmail(
    @Arg("input") input: VerifyEmailInput,
    @Ctx() { redisClient, req }: MyContext
  ): Promise<UserResponse> {
    const key = VERIFY_EMAIL_PREFIX + input.token;

    const getUserId = (key: string): Promise<string | null> => {
      return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
          if (err) {
            reject(err);
          }
          resolve(val);
        });
      });
    };

    const userId = await getUserId(key);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired.",
          },
        ],
      };
    }

    const user = await User.findOneOrFail(parseInt(userId));

    user.hasverified = true;
    await user.save();

    redisClient.del(key);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  contactUs(@Arg("input") input: contactUsInput): Boolean {
    sendContactUsEmail(
      input.name,
      input.email,
      input.classification,
      input.message
    );
    return true;
  }

  @Mutation(() => Boolean)
  async forceDeleteUser(
    @Arg("input") input: forceDeleteUserInput
  ): Promise<boolean> {

    console.log("input===>>>",input)
    const user = await User.findOneOrFail(input.userId, {
      relations: [
        "solarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants",
        "solarPowerPlantOwner.solarPowerPlants.solarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants.officialSolarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants.jobs",
        "solarPowerPlantOwner.solarPowerPlants.jobs.jobApplications",
        "solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer.representative",
        "solarPowerPlantMaintainer.jobApplications",
        "solarPowerPlantMaintainer.approvedJobs",
      ],
    });

    console.log("user=====",user)
    console.log("user.solarPowerPlantOwner.solarPowerPlants=====",user.solarPowerPlantOwner.solarPowerPlants)
    if (user.userType === UserType.Owner) {
      for (const powerPlant of user.solarPowerPlantOwner.solarPowerPlants) {
        console.log("powerPlant.jobs=====",powerPlant.jobs)
        for (const job of powerPlant.jobs) {
          if (job?.jobApplications?.length > 0) {
            for (const application of job.jobApplications) {
              await application.remove();
            }
          }
          if (job?.jobFavorites?.length > 0) {
            for (const favorite of job.jobFavorites) {
              await favorite.remove();
            }
          }
          const jobFileResult = await JobFileInfo.find({where:{job:job}},)
          if (jobFileResult.length > 0 ){
            for (const result of jobFileResult){
              await JobFileInfo.remove(result)
            }
          }
          console.log("jobFileResult===",jobFileResult)
          console.log("job?.jobFiles?===",job?.jobFiles)
          if (job?.jobFiles?.length > 0) {
            for (const jobFile of job.jobFiles) {
              await jobFile.remove();
            }
          }
          const result = await job.remove();
          console.log("result====>>>", result)
        }
        powerPlant.solarPowerPlantOwner =
            powerPlant.officialSolarPowerPlantOwner;
        powerPlant.linked = false;
        await powerPlant.save();
      }
      const notifications = await AppNotification.find({
        where: {user: user},
      });
      await AppNotification.remove(notifications);

      console.log("user====>>>",user)
      const channels = await ChannelsMembers.findOne({
        where: {user},
      });

      console.log("channels=====>>>",channels)

      if (channels){
        const channels = await ChannelsMembers.findOneOrFail({
          where: {user},
          relations: ["channel", "channel.messages"],
        });
        const chnnel = await Channel.findOneOrFail(channels.channelId)
        console.log("chnnelchnnel===>>",chnnel)
        chnnel.deleted = true;
        const result =  await chnnel.save();

        console.log("chnnel===>>",chnnel)
        console.log("result===>>",result)
      }










    //   if (channels.length > 0) {
    //   for (const channel of channels) {
    //     for (const message of channel.channel.messages) {
    //       await message.remove();
    //     }
    //     await channel.channel.remove();
    //     await channel.remove();
    //   }
    // }
      await User.query('ALTER TABLE public.user DISABLE TRIGGER ALL;')
      await user.remove();
      await user.solarPowerPlantOwner.remove();
      await User.query('ALTER TABLE public.user ENABLE TRIGGER ALL;')
    }
    if (user.userType === UserType.Maintainer) {
      for (const applications of user.solarPowerPlantMaintainer
        .jobApplications) {
        await applications.remove();
      }
      user.solarPowerPlantMaintainer.approvedJobs = [];
      await user.solarPowerPlantMaintainer.save();


      const chanels = await ChannelsMembers.findOne({
        where: {user},
      });

      if (chanels){
        const channels = await ChannelsMembers.findOneOrFail({
          where: {user},
          relations: ["channel", "channel.messages"],
        });

        const chnnel = await Channel.findOneOrFail(channels.channelId)
        console.log("chnnelchnnel===>>",chnnel)
        chnnel.deleted = true;
        await chnnel.save();
      }


      // const channels = await ChannelsMembers.find({
      //   where: { user },
      //   relations: ["channel", "channel.messages"],
      // });
      // for (const channel of channels) {
      //   for (const message of channel.channel.messages) {
      //     message.remove();
      //   }
      //   await channel.channel.remove();
      //   await channel.remove();
      // }
      await User.query('ALTER TABLE public.user DISABLE TRIGGER ALL;')
      await user.remove();
      await user.solarPowerPlantMaintainer.remove();
      await user.solarPowerPlantMaintainer.representative.remove();
      await User.query('ALTER TABLE public.user ENABLE TRIGGER ALL;')
    }else{
      await user.remove();
      if (user.solarPowerPlantOwner) {
        await user.solarPowerPlantOwner.remove();
      }
      if (user.solarPowerPlantMaintainer) {
        await user.solarPowerPlantMaintainer.remove();
      }
    }

    return true;
  }

  @Mutation(() => Boolean)
  async checkUserCanDelete(
      @Arg("input") input: forceDeleteUserInput
  ): Promise<boolean> {
    const user = await User.findOneOrFail(input.userId, {
      relations: [
        "solarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants",
        "solarPowerPlantOwner.solarPowerPlants.solarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants.officialSolarPowerPlantOwner",
        "solarPowerPlantOwner.solarPowerPlants.jobs",
        "solarPowerPlantOwner.solarPowerPlants.jobs.jobApplications",
        "solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer.representative",
        "solarPowerPlantMaintainer.jobApplications",
        "solarPowerPlantMaintainer.approvedJobs",
      ],
    });
    console.log("powerPlant===>>",user)
    let canDeleteUser: boolean = true
    if (user.userType === UserType.Owner) {
      for (const powerPlant of user.solarPowerPlantOwner.solarPowerPlants) {

        for (const job of powerPlant.jobs) {
          if ( job.status === JobStatus.WaitingForCompletion || job.status === JobStatus.OrdererEvaluation || job.status === JobStatus.Open || job.status === JobStatus.TempPayment|| job.status === JobStatus.ContractorEvaluation) {
            canDeleteUser = false;
            break;
          }
        }
      }
    }
    if (user.userType === UserType.Maintainer) {
      if (user.solarPowerPlantMaintainer.approvedJobs.length > 0 ){
        canDeleteUser = false;
      }
    }
    if(canDeleteUser){
      const user = await User.findOneOrFail(input.userId);
      user.withdrawal = "yes"
      await user.save()
    }
    return canDeleteUser;
  }
}
