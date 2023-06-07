import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { PaymentStatus } from "../enums";
import { PaymentTransaction } from "../entities/PaymentTransaction";
import { JobApplications } from "../entities/JobApplications";
import { Job } from "../entities/Job";

@InputType()
class initializeTransactionInput {
  @Field()
  jobId: number;
}

@ObjectType()
class initializeTransactionPayload {
  @Field()
  transaction: PaymentTransaction;
}

@InputType()
class TransactionUpdateInput {
  @Field()
  transactionId: string;
}

@Resolver()
export class PaymentTransactionResolver {
  @Query(() => [PaymentTransaction])
  paymentTransactions(): Promise<PaymentTransaction[]> {
    return PaymentTransaction.find({
      relations: [
        "user",
        "job",
        "job.approvedApplicant",
        "job.approvedApplicant.user",
      ],
      withDeleted: true,
    });
  }

  @Query(() => PaymentTransaction)
  paymentTransaction(
    @Arg("paymentTransactionId") paymentTransactionId: string
  ): Promise<PaymentTransaction> {
    return PaymentTransaction.findOneOrFail({
      where: { transactionId: paymentTransactionId },
    });
  }

  @Mutation(() => initializeTransactionPayload)
  async initializeTransaction(
    @Arg("input") input: initializeTransactionInput,
    @Ctx() { req }: MyContext
  ): Promise<initializeTransactionPayload> {
    let transId;
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);

    const job = await Job.findOneOrFail(input.jobId, {
      relations: ["approvedApplicant"],
    });

    const jobApplication = await JobApplications.findOneOrFail({
      where: {
        jobId: input.jobId,
        solarPowerPlantMaintainerId: job.approvedApplicant.id,
      },
    });

    console.log(jobApplication);

    transId =
      user.id.toString() +
      jobApplication.id.toString() +
      Math.floor(Math.random() * 1000).toString();
    transId = "P" + transId.padStart(11, "0");
    const transaction = await PaymentTransaction.create({
      transactionId: transId,
      user: user,
      job: job,
      amount: jobApplication.suggestedPrice,
    }).save();
    console.log(transaction);
    return { transaction };
  }

  @Mutation(() => PaymentTransaction)
  async updateTransactiontProcessing(
    @Arg("input") input: TransactionUpdateInput
  ): Promise<PaymentTransaction> {
    const transaction = await PaymentTransaction.findOneOrFail({
      where: { transactionId: input.transactionId },
    });
    transaction.status = PaymentStatus.Proccessing;
    return transaction.save();
  }

  @Mutation(() => PaymentTransaction)
  async updateTransactionFailed(
    @Arg("input") input: TransactionUpdateInput
  ): Promise<PaymentTransaction> {
    const transaction = await PaymentTransaction.findOneOrFail({
      where: { transactionId: input.transactionId },
    });
    transaction.status = PaymentStatus.Failed;
    return transaction.save();
  }

  @Mutation(() => PaymentTransaction)
  async updateTransactiontSucessful(
    @Arg("input") input: TransactionUpdateInput
  ): Promise<PaymentTransaction> {
    const transaction = await PaymentTransaction.findOneOrFail({
      where: { transactionId: input.transactionId },
      relations: [
        "user",
        "user.solarPowerPlantOwner",
        "job",
        "job.approvedApplicant",
        "job.approvedApplicant.user",
      ],
    });
    transaction.status = PaymentStatus.Successful;
    await transaction.save();
    return transaction;
  }
}
