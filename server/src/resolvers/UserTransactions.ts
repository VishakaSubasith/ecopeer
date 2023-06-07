import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { UserTransaction } from "../entities/UserTransactions";
import { User } from "../entities/User";
import { AccountType, PaymentStatus } from "../enums";

@Resolver()
export class UserTransactionResolver {
  @Mutation(() => UserTransaction)
  async initializeUserTransaction(
    @Arg("paymentId") paymentId: string,
    @Ctx() { req }: MyContext
  ): Promise<UserTransaction> {
    let transId;
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    const lastTransaction = await UserTransaction.findOne({
      where: { user: user },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
    if (lastTransaction) {
      transId = parseInt(lastTransaction.transactionId.slice(3)) + 1;
    } else {
      transId = 1;
    }
    transId = transId.toString();
    transId = transId.padStart(9, "0");
    transId = "U3M" + transId;

    let userTransaction = UserTransaction.create({
      transactionId: paymentId,
      price: 2000,
      status: PaymentStatus.Proccessing,
      user: user,
    });
    return userTransaction.save();
  }

  @Mutation(() => UserTransaction)
  async updateUserPaymentStatus(
    @Arg("paymentStatus") paymentStatus: PaymentStatus,
    @Arg("transactionId") transactionId: string
  ): Promise<UserTransaction> {
    const transaction = await UserTransaction.findOneOrFail({
      where: { transactionId: transactionId },
      relations: ["user"],
    });
    if (paymentStatus === PaymentStatus.Successful) {
      transaction.status = PaymentStatus.Successful;
      const user = await User.findOneOrFail(transaction.user.id);
      user.accountType = AccountType.Paid;
      await user.save();
    } else {
      transaction.status = PaymentStatus.Failed;
    }
    console.log(transaction);
    return transaction.save();
  }

  @Query(() => [UserTransaction])
  async getSubscriptions(
    @Ctx() { req }: MyContext
  ): Promise<UserTransaction[]> {
    const userId = req.session.userId;
    return UserTransaction.createQueryBuilder()
      .where("user.id = :id", { id: userId })
      .innerJoinAndSelect("UserTransaction.user", "user")
      .getMany();
  }
}
