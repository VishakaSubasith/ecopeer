import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { SolarPowerPlantMaintainer } from "../entities/SolarPowerPlantMaintainer";
import { Representative } from "../entities/Representative";
import { UserType } from "../enums";



@InputType()
class MaintainerInput {
  @Field()
  name: string;

  @Field()
  intro: string;

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
class RepresentativeInput {
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
}


@InputType()
class CreateMaintainerProfileInput {
  @Field()
  userId : number ;

  @Field()
  maintainer: MaintainerInput;

  @Field()
  representative: RepresentativeInput;
}

@InputType()
class MaintainerUpdateInput {
  @Field()
  nickname: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  // @Field()
  // intro: string;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;

  @Field()
  intro: string;

  @Field(() => Float)
  lat?: number;

  @Field(() => Float)
  lng?: number;

  @Field()
  representative: RepresentativeInput;
}

@Resolver()
export class SolarPowerPlantMaintainerResolver {

  @Query(() => [SolarPowerPlantMaintainer])
  solarPowerPlantMaintainers(): Promise<SolarPowerPlantMaintainer[]> {
    return SolarPowerPlantMaintainer.find({
      relations:["user"]
    });
  }

  // Mutations
  @Mutation(() => Boolean)
  async createMaintainerProfile(
    @Ctx() { req }: MyContext,
    @Arg("input") input: CreateMaintainerProfileInput
  ) {
    const userId = input.userId;
    let newUser = await User.findOneOrFail(userId);

    const powerPlantRepresentative = await Representative.create({
      ...input.representative,
    }).save();

    const powerPlantMaintainer = await SolarPowerPlantMaintainer.create({
      ...input.maintainer,
      representative: powerPlantRepresentative,
    }).save();

    newUser.solarPowerPlantMaintainer = powerPlantMaintainer;
    newUser.userType = UserType.Maintainer;

    await newUser.save();
    req.session.userId = newUser.id;

    return true;
  }

  @Mutation(() => Boolean)
  async createSolarPowerPlantMaintainer(
    @Arg("maintainer") maintainerInput: MaintainerInput,
    @Arg("representative") representativeInput: RepresentativeInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    const newRepresentative = await Representative.create({
      ...representativeInput,
    }).save();
    const newMaintainer = await SolarPowerPlantMaintainer.create({
      ...maintainerInput,
      representative: newRepresentative,
    }).save();
    user.solarPowerPlantMaintainer = newMaintainer;
    await user.save();
    console.log(user);
    return true;
  }

  @Mutation(() => Boolean)
  async updateMaintainerInfo(
    @Arg("input") input: MaintainerUpdateInput,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId, {
      relations: [
        "solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer.representative",
      ],
    });

    const maintainer = user.solarPowerPlantMaintainer;
    maintainer.name = input.nickname;
    maintainer.address = input.address;
    maintainer.phoneNumber = input.phoneNumber;
    maintainer.intro = input.intro;
    // @ts-ignore
    maintainer.lat = input.lat;
    // @ts-ignore
    maintainer.lng= input.lng;
    maintainer.representative.nickname = input.representative.nickname;
    maintainer.representative.firstName = input.representative.firstName;
    maintainer.representative.lastName = input.representative.lastName;
    maintainer.representative.gender = input.representative.gender;
    maintainer.representative.DOB = input.representative.DOB;
    maintainer.representative.address = input.representative.address;
    maintainer.representative.phoneNumber = input.representative.phoneNumber;
    maintainer.representative.companyName = input.representative.companyName
    await maintainer.representative.save();
    await maintainer.save();
    return true;
  }
}
