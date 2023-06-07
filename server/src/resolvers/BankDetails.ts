import {BankDetails} from "../entities/BankDetails";
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
class SaveBankDetailsInput {
    @Field()
    bankName: string;

    @Field()
    branchName: string;

    @Field()
    depositItem: string;

     @Field()
    accountNumber: string;

     @Field()
     accountHolderKanji: string;

     @Field()
     accountHolderHiragana: string;

     @Field()
     userId: number;

     @Field()
    bankType: string;

}

@InputType()
class UpdateBankDetailsInput {
    @Field()
    bankName: string;

    @Field()
    branchName: string;

    @Field()
    depositItem: string;

     @Field()
    accountNumber: string;

     @Field()
     accountHolderKanji: string;

     @Field()
     accountHolderHiragana: string;

     @Field()
     userId: number;

    @Field()
    bankType: string;

}

// @InputType()
// class getBankDetailsInput {
//     @Field()
//     userId:number
// }

@ObjectType()
class ErrorField {
    @Field()
    field: String;

    @Field()
    message: String;
}


@ObjectType()
class BankDetailsResponse {
    @Field(() => [ErrorField], { nullable: true })
    errors?: ErrorField[];

    @Field(() => BankDetails, { nullable: true })
    bankDetails?: BankDetails;
}

@Resolver()
export class BankDetailsResolver {

    @Mutation(() => BankDetailsResponse)
    async saveBankDetails(
        @Arg("input") input: SaveBankDetailsInput,
        @Ctx() { req }: MyContext
    ): Promise<BankDetailsResponse> {
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

        // @ts-ignore
        // @ts-ignore
        const bankDetails = await BankDetails.create({bankName: input.bankName, branchName: input.branchName, depositItem: input.depositItem, accountNumber: input.accountNumber , accountHolderKanji: input.accountHolderKanji, accountHolderHiragana: input.accountHolderHiragana, userId: input.userId, bankType:input.bankType}).save();


        return {
            bankDetails:bankDetails
        }
    }
    @Query(() => [BankDetails])
   getBankDetailsByUserId(
        @Arg("userId") userId: number,
    ):  Promise<BankDetails[]> {
        return   BankDetails.find({
            relations: [],
            where: { userId: userId },
            take: 1
        });


    }

    @Mutation(() => BankDetailsResponse)
    async updateBankDetails(
        @Arg("input") input: UpdateBankDetailsInput,
        @Ctx() { req }: MyContext
    ): Promise<BankDetailsResponse> {
        let bankDetails = await BankDetails.findOneOrFail({where:{userId:req.session.userId}});
            bankDetails.bankName= input.bankName,
            bankDetails.branchName= input.branchName,
            bankDetails.depositItem= input.depositItem,
            bankDetails.accountNumber= input.accountNumber,
            bankDetails.accountHolderKanji=input.accountHolderKanji,
            bankDetails.accountHolderHiragana= input.accountHolderHiragana,
            bankDetails.userId= input.userId,
                bankDetails.bankType = input.bankType
        const bd = await bankDetails.save()
        req.session.userId = input.userId;
        return {
            bankDetails:bd
        };
    }

}

