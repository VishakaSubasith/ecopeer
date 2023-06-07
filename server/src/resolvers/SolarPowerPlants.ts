import { SolarPowerPlant } from "../entities/SolarPowerPlant";
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Like } from "typeorm";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { Region } from "../entities/Region";
import { City } from "../entities/City";

@InputType()
class SolarPowerPlantInput {
  @Field({ nullable: true })
  officialId?: string;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field(() => Float)
  totalPowerOutput: number;

  @Field()
  classification: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field()
  cityId: number;

  @Field()
  regionId: number;
}

@InputType()
class SolarPowerPlantUpdateInput {
  @Field(() => Float)
  solarPowerPlantId: number;

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => Float, { nullable: true })
  lng?: number;

  @Field({ nullable: true })
  name?: string;
}

@Resolver()
export class SolarPowerPlantResolver {
  @Query(() => [SolarPowerPlant])
  solarPowerPlants(): Promise<SolarPowerPlant[]> {
    return SolarPowerPlant.find({
      relations: ["solarPowerPlantOwner", "city", "region"],
    });
  }

  @Query(() => [SolarPowerPlant])
  searchSolarPowerPlantsByOfficialId(
    @Arg("officialId") officialId: string,
    @Arg("limit") limit: number
  ): Promise<SolarPowerPlant[]> {
    return SolarPowerPlant.find({
      relations: ["solarPowerPlantOwner", "solarPowerPlantOwner.user"],
      where: { officialId: Like(`%${officialId}%`) },
      take: limit,
    });
  }

  @Mutation(() => Boolean)
  async updatePowerplant(
    @Arg("input") input: SolarPowerPlantUpdateInput
  ): Promise<boolean> {
    const res = await SolarPowerPlant.update(input.solarPowerPlantId, {
      lat: input.lat,
      lng: input.lng,
      name: input.name,
    });
    if (res.affected && res.affected > 0) {
      return true;
    }
    return false;
  }

  @Mutation(() => SolarPowerPlant)
  @UseMiddleware(isAuth)
  async createSolarPowerPlant(
    @Ctx() { req }: MyContext,
    @Arg("input") input: SolarPowerPlantInput
  ): Promise<SolarPowerPlant> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId, {
      relations: ["solarPowerPlantOwner"],
    });

    const region = await Region.findOneOrFail(input.regionId);
    const city = await City.findOneOrFail(input.cityId);
    const owner = user.solarPowerPlantOwner;

    return SolarPowerPlant.create({
      ...input,
      officialId:`W${Math.floor(100000000 + Math.random() * 900000000)}`,
      region,
      city,
      solarPowerPlantOwner: owner,
    }).save();
  }
}
