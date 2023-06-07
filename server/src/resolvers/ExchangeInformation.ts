import {ExchangeInformation} from "../entities/ExchangeInformation";
import {
    Arg, Ctx,
    Field, InputType,
    Mutation,
    ObjectType, Query,
    Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import {MyContext} from "../types";


@InputType()
class SaveExchangeInformationInput {
    @Field()
    blogUrl: string;

    @Field()
    twitter: string;

    @Field()
    comment: string;

    @Field()
    interested: string;

    @Field()
    trouble: string;

    @Field()
    userId: number;

}

@InputType()
class UpdateExchangeInformationInput {
    @Field()
    blogUrl: string;

    @Field()
    twitter: string;

    @Field()
    comment: string;

    @Field()
    interested: string;

    @Field()
    trouble: string;

    @Field()
    userId: number;

}

// @InputType()
// class getBankDetailsInput {
//     @Field()
//     userId:number
// }

@ObjectType()
class ErrorFieldExchange {
    @Field()
    field: String;

    @Field()
    message: String;
}


@ObjectType()
class ExchangeInformationResponse {
    @Field(() => [ErrorFieldExchange], { nullable: true })
    errors?: ErrorFieldExchange[];

    @Field(() => ExchangeInformation, { nullable: true })
    exchangeInformation?: ExchangeInformation;
}

@Resolver()
export class ExchangeInformationResolver {

    @Mutation(() => ExchangeInformationResponse)
    async saveExchangeInformation(
        @Arg("input") input: SaveExchangeInformationInput,
        @Ctx() { req }: MyContext
    ): Promise<ExchangeInformationResponse> {
        const user = await User.findOne({where: {id: req.session.userId}});

        if (!user) {
            return {
                errors: [
                    {
                        field: "userId",
                        message: "無効なユーザー",
                    },
                ],
            };
        }

        const exchangeInformation = await ExchangeInformation.create({
            blogUrl: input.blogUrl,
            twitter: input.twitter,
            comment: input.comment,
            interested: input.interested,
            trouble: input.trouble,
            userId: input.userId,
        }).save();


        return {
            exchangeInformation:exchangeInformation
        }
    }
    @Query(() => [ExchangeInformation])
    getExchangeInformationByUserId(
        @Arg("userId") userId: number,
    ):  Promise<ExchangeInformation[]> {
        return   ExchangeInformation.find({
            relations: [],
            where: { userId: userId },
            take: 1
        });


    }

    @Query(() => [ExchangeInformation])
    getExchangeInformations(
        // @Arg("userId") userId: number,
    ):  Promise<ExchangeInformation[]> {
        return   ExchangeInformation.find();
    }

    @Mutation(() => ExchangeInformationResponse)
    async updateExchangeInformation(
        @Arg("input") input: UpdateExchangeInformationInput,
        @Ctx() { req }: MyContext
    ): Promise<ExchangeInformationResponse> {
        let exchangeInformation = await ExchangeInformation.findOneOrFail({where:{userId:req.session.userId}});
            exchangeInformation.blogUrl= input.blogUrl,
            exchangeInformation.twitter= input.twitter,
            exchangeInformation.comment= input.comment,
            exchangeInformation.interested= input.interested,
            exchangeInformation.trouble= input.trouble,
            exchangeInformation.userId= input.userId
        const ei = await exchangeInformation.save()
        req.session.userId = input.userId;
        return {
            exchangeInformation:ei
        };
    }

}

