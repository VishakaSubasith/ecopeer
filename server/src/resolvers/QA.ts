import { Question } from "../entities/Question";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { Answer } from "../entities/Answer";

@InputType()
class QuestionInput {
  @Field()
  questionId: number;
}

@InputType()
class CreateQuestionInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@InputType()
class CreateAnswerInput {
  @Field()
  questionId: number;

  @Field()
  text: string;
}

@Resolver()
export class QAResolver {
  @Query(() => [Question])
  questions(): Promise<Question[]> {
    return Question.find({ relations: ["answers", "user"] });
  }

  @Query(() => Question)
  question(@Arg("input") input: QuestionInput): Promise<Question> {
    return Question.findOneOrFail(input.questionId, {
      relations: ["user", "answers", "answers.user"],
    });
  }

  @Mutation(() => Question)
  async createQuestion(
    @Ctx() { req }: MyContext,
    @Arg("input") input: CreateQuestionInput
  ) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);

    return Question.create({ ...input, user }).save();
  }

  @Mutation(() => Question)
  async createAnswer(
    @Ctx() { req }: MyContext,
    @Arg("input") input: CreateAnswerInput
  ) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);

    const question = await Question.findOneOrFail(input.questionId, {
      relations: ["answers"],
    });

    const answer = await Answer.create({
      text: input.text,
      user,
      question,
    }).save();

    question.answers = [...question.answers, answer];

    return question.save();
  }
}
