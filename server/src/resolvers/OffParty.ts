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
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { User } from "../entities/User";
import { OffParty } from "../entities/OffParty";

@InputType()
class OffPartyInput {
  @Field()
  dateAndTime!: Date;

  @Field()
  address!: string;

  @Field(() => Float)
  lat!: number;

  @Field(() => Float)
  lng!: number;

  @Field()
  venue!: string;

  @Field()
  access!: string;

  @Field()
  price!: number;

  @Field()
  form!: string;

  @Field()
  belongings!: string;

  @Field()
  clothing!: string;

  @Field()
  precautions!: string;

  @Field()
  cacellationRules!: string;

  @Field()
  content!: string;
}

@Resolver()
export class OffPartyResolver {
  // Queries

  @Query(() => [OffParty])
  getOffParties(): Promise<OffParty[]> {
    return OffParty.find();
  }
  // Mutations

  @Mutation(() => OffParty)
  @UseMiddleware(isAuth)
  async createOffParty(
    @Arg("input") input: OffPartyInput,
    @Ctx() { req }: MyContext
  ): Promise<OffParty> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    return OffParty.create({
      creator: user,
      ...input,
    }).save();
  }
}
