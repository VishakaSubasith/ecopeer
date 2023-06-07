import { SolarPowerPlant } from "../entities/SolarPowerPlant";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { SolarPowerPlantOwner } from "../entities/SolarPowerPlantOwner";
import { User } from "../entities/User";
import { OwnerType, UserType } from "../enums";

@InputType()
class CreateOwnerProfileInput {
  @Field()
  userId: number;

  @Field(() => OwnerType)
  ownerType: OwnerType;

  @Field()
  companyName: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  nickname: string;

  @Field()
  gender: string;

  @Field()
  DOB: Date;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;

  @Field(() => Float)
  lat?: number;

  @Field(() => Float)
  lng?: number;
}

@InputType()
class OwnerUpdateInput {
  @Field(() => OwnerType)
  ownerType: OwnerType;

  @Field()
  companyName: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  nickname: string;

  @Field()
  gender: string;

  @Field()
  DOB: Date;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;

  @Field(() => Float)
  lat?: number;

  @Field(() => Float)
  lng?: number;
}

@InputType()
class DisassociatePowerPlantInput {
  @Field()
  powerPlantId: number;
}

@ObjectType()
class DisassociatePowerPlantResponse {
  @Field()
  status: boolean;
  @Field()
  message: string;
}

@Resolver()
export class SolarPowerPlantOwnerResolver {
  @Query(() => SolarPowerPlantOwner)
  ownerSolarPowerPlants(
    @Ctx() { req }: MyContext
  ): Promise<SolarPowerPlantOwner> {
    const ownerUserId = req.session.userId;
    console.log("ownerUserId====>>>>",ownerUserId)
    return SolarPowerPlantOwner.createQueryBuilder()
      .where("user.id = :id", { id: ownerUserId })
      .innerJoinAndSelect("SolarPowerPlantOwner.user", "user")
      .innerJoinAndSelect(
        "SolarPowerPlantOwner.solarPowerPlants",
        "solarPowerPlants"
      )
      .getOneOrFail();
  }
  @Query(() => [SolarPowerPlantOwner])
  async solarPowerPlantsOwners(
      // @Ctx() { req }: MyContext
  ): Promise<SolarPowerPlantOwner[] > {
    // const ownerUserId = req.session.userId;
    // console.log("ownerUserId====>>>>",ownerUserId)
    const result= await SolarPowerPlantOwner.createQueryBuilder()
        // .where(`user.solarPowerPlantOwnerId > 1`)
        .innerJoinAndSelect("SolarPowerPlantOwner.user", "user")
        // .innerJoinAndSelect(
        //     "SolarPowerPlantOwner.solarPowerPlants",
        //     "solarPowerPlants"
        // )
        .getMany();
    // const result = SolarPowerPlantOwner.createQueryBuilder().
    console.log("result====>>>",result)
    // const users = User.find({where})
    return result;
  }

  // Mutations
  @Mutation(() => Boolean)
  async createOwnerProfile(
    @Ctx() { req }: MyContext,
    @Arg("input") input: CreateOwnerProfileInput
  ) {
    const userId = input.userId;
    let newUser = await User.findOneOrFail(userId);

    const powerPlantOwner = await SolarPowerPlantOwner.create({
      ownerType: input.ownerType,
      companyName: input.companyName,
      firstName: input.firstName,
      lastName: input.lastName,
      nickname: input.nickname,
      gender: input.gender,
      DOB: input.DOB,
      phoneNumber: input.phoneNumber,
      address: input.address,
      lat: input.lat,
      lng: input.lng,
      // ...input,
    }).save();
    newUser.solarPowerPlantOwner = powerPlantOwner;
    newUser.userType = UserType.Owner;

    await newUser.save();
    req.session.userId = newUser.id;

    return true;
  }

  @Mutation(() => Boolean)
  async claimPowerPlant(
    @Arg("powerPlantId") powerPlantId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const ownerUserId = req.session.userId;
    console.log("ownerUserId2====>>>>",ownerUserId)
    const owner = await SolarPowerPlantOwner.createQueryBuilder()
      .where("user.id = :id", {
        id: ownerUserId,
      })
      .leftJoinAndSelect("SolarPowerPlantOwner.user", "user")
      .getOneOrFail();
    console.log("owner====>>>>",owner)
    const solarPowerPlant = await SolarPowerPlant.findOneOrFail(powerPlantId);
    console.log("solarPowerPlant====>>>>",solarPowerPlant)

    solarPowerPlant.solarPowerPlantOwner = owner;
    solarPowerPlant.linked = true;
    await solarPowerPlant.save();

    return true;
  }

  @Mutation(() => DisassociatePowerPlantResponse)
  async disassociatePowerPlant(
    @Arg("input") input: DisassociatePowerPlantInput
  ): Promise<DisassociatePowerPlantResponse> {
    const powerPlant = await SolarPowerPlant.findOneOrFail(input.powerPlantId, {
      relations: [
        "jobs",
        "solarPowerPlantOwner",
        "solarPowerPlantOwner.user",
        "officialSolarPowerPlantOwner",
      ],
    });
    if (powerPlant.jobs.length > 0) {
      return {
        status: false,
        message: "発電所を削除することはできませんそれで仕事があります",
      };
    }
    powerPlant.solarPowerPlantOwner = powerPlant.officialSolarPowerPlantOwner;
    powerPlant.linked = false;
    await powerPlant.save();
    return { status: true, message: "成功" };
  }

  @Mutation(() => Boolean)
  async createSolarPowerPlantOwner(
    @Arg("input") input: CreateOwnerProfileInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    const newOwner = await SolarPowerPlantOwner.create({ ...input }).save();
    user.solarPowerPlantOwner = newOwner;
    await user.save();
    console.log(user);
    return true;
  }

  @Mutation(() => Boolean)
  async updateOwnerInfo(
    @Arg("input") input: OwnerUpdateInput,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId, {
      relations: ["solarPowerPlantOwner"],
    });
    const ownerId = user.solarPowerPlantOwner.id;

    const res = await SolarPowerPlantOwner.update(ownerId, input);
    if (res.affected) {
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
