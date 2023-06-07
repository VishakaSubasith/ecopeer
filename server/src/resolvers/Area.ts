import { Area } from "../entities/Area";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class AreaResolver {
  @Query(() => [Area])
  areas(): Promise<Area[]> {
    return Area.find({ relations: ["regions"] });
  }
}
