import { Region } from "../entities/Region";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class RegionResolver {
  @Query(() => [Region])
  regions(): Promise<Region[]> {
    return Region.find({ relations: ["cities"] });
  }

  @Query(() => Region)
  region(@Arg("id") id: number): Promise<Region> {
    return Region.createQueryBuilder()
      .where("Region.id = :id", { id: id })
      .leftJoinAndSelect("Region.solarPowerPlants", "solarPowerPlants")
      .innerJoinAndSelect(
        "Region.cities",
        "city",
        "city.id = solarPowerPlants.cityId"
      )
      .leftJoinAndSelect(
        "solarPowerPlants.solarPowerPlantOwner",
        "solarPowerPlantOwner"
      )
      .leftJoinAndSelect("solarPowerPlants.jobs", "jobs")
      .getOneOrFail();
  }
}
