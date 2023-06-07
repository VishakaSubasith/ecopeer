import { AppNotification } from "../entities/AppNotification";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { User } from "../entities/User";

@InputType()
class MarkNotificationAsReadInput {
  @Field()
  notificationId: number;
}

@Resolver()
export class AppNotificationResolver {
  // Queries
  @Query(() => [AppNotification])
  async userNotifications(@Ctx() { req }: MyContext) {
    const user = await User.findOneOrFail(req.session.userId);
    return AppNotification.find({
      where: { user: user.id },
      order: { createdAt: "DESC" },
    });
  }

  // Mutations
  @Mutation(() => Boolean)
  async markAllNotificationsAsRead(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    await AppNotification.update({ user }, { isRead: true });
    return true;
  }

  @Mutation(() => Boolean)
  async markNotificationAsRead(
    @Arg("input") input: MarkNotificationAsReadInput
  ) {
    await AppNotification.update(
      { id: input.notificationId },
      { isRead: true }
    );
    return true;
  }

  // Subscriptions
  @Subscription({
    topics: "NEW_NOTIFICATION",
    filter: async ({ payload, args }) => payload._user.id === args.userId,
  })
  newNotification(
    @Root() messagePayload: AppNotification,
    @Arg("userId") _userId: number
  ): AppNotification {
    return messagePayload;
  }
}
