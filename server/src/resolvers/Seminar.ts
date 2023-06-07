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
import { Seminar } from "../entities/Seminar";

@InputType()
class SeminarInput {
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
export class SeminarResolver {
  // Queries

  @Query(() => [Seminar])
  getSeminars(): Promise<Seminar[]> {
    return Seminar.find();
  }
  // Mutations

  @Mutation(() => Seminar)
  @UseMiddleware(isAuth)
  async createSeminar(
    @Arg("input") input: SeminarInput,
    @Ctx() { req }: MyContext
  ): Promise<Seminar> {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    return Seminar.create({
      creator: user,
      ...input,
    }).save();
  }
}
