import { Channel } from "../entities/Channel";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import { Message } from "../entities/Message";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { finished } from "stream/promises";
import path from "path";
import { FileInfo } from "../entities/FileInfo";
import { ChannelsMembers } from "../entities/ChannelsMembers";
import { Job } from "../entities/Job";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmails";
import { Not } from "typeorm";

@InputType()
class MarkChannelAsReadInput {
  @Field()
  channelId: number;
}

@InputType()
class StartChatWithApprovedApplicantInput {
  @Field()
  jobId: number;
}

@InputType()
class chatWithOwnerInput {
  @Field()
  jobId: number;
}

@ObjectType()
class ChannelExtraInfo {
  @Field()
  channel: Channel;

  @Field()
  unReadCount: number;
}

@ObjectType()
class ChannelsResponse {
  @Field(() => [ChannelExtraInfo])
  channelsExtraInfo: ChannelExtraInfo[];
}

@Resolver()
export class ChannelResolver {
  // Queries
  @Query(() => ChannelsResponse)
  async channels(@Ctx() { req }: MyContext): Promise<ChannelsResponse> {
    const userId = req.session.userId;
    const channelRes = await ChannelsMembers.find({
      select: ["channelId"],
      where: { userId },
    });
    const channelIds = channelRes.map((channel) => channel.channelId);
    let channels: any[] = await Channel.createQueryBuilder("channel")
      .whereInIds(channelIds)
      .innerJoinAndSelect("channel.channelsMembers", "channelsMembers")
      .innerJoinAndSelect("channelsMembers.user", "user")
      .leftJoinAndSelect("user.solarPowerPlantOwner", "solarPowerPlantOwner")
      .leftJoinAndSelect(
        "user.solarPowerPlantMaintainer",
        "solarPowerPlantMaintainer"
      )      .leftJoinAndSelect(
        "solarPowerPlantMaintainer.representative",
        "representative"
      )
      .loadRelationCountAndMap(
        "channel.unRead",
        "channel.messages",
        "messages",
        (qb) =>
          qb
            .where("messages.isRead = false")
            .andWhere("messages.senderId <> :senderId", { senderId: userId })
      )
      .getMany();



    const channelsExtraInfo = {
      channelsExtraInfo: channels.map((channel: any) => ({
        channel,
        unReadCount: channel.unRead,
      })),
    };
    return channelsExtraInfo;
  }

  @Query(() => [Message])
  async messages(@Arg("channelId") channelId: number): Promise<Message[]> {
    const channel = await Channel.findOneOrFail(channelId, {
      relations: ["messages", "messages.uploadedFile"],
    });
    return channel.messages;
  }

  // Mutations
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() { req }: MyContext,
    @Arg("otherUserId") otherUserId: number,
    @Arg("jobId") jobId: number
    // ): Promise<Channel> {
  ): Promise<any> {
    const userId = req.session.userId;

    const channelIds = await Channel.query(
      'SELECT DISTINCT userOne."channelId" FROM (SELECT * from channels_members where "userId" in ($1)) userOne INNER JOIN (SELECT * from channels_members where "userId" in ($2)) userTwo USING("channelId")',
      [userId, otherUserId]
    );
    console.log("Channel ids", channelIds);
    if (!channelIds.length) {
      const currentUser = await User.findOneOrFail(userId);
      const otherUser = await User.findOneOrFail(otherUserId);
      const newChannel = await Channel.create().save();
      await ChannelsMembers.create({
        channelId: newChannel.id,
        channel: newChannel,
        userId: userId,
        user: currentUser,
      }).save();
      await ChannelsMembers.create({
        channelId: newChannel.id,
        channel: newChannel,
        userId: otherUserId,
        user: otherUser,
      }).save();

      const job = await Job.findOneOrFail(jobId);
      const content = `No：${job.id}・タイトル：${job.title}・予算：${job.budget}`;
      await Message.create({
        channel: newChannel,
        content: content,
        senderId: currentUser.id,
      }).save();
      return newChannel;
    }

    const job = await Job.findOneOrFail(jobId);
    const content = `No：${job.id}・タイトル：${job.title}・予算：${job.budget}`;
    await Message.create({
      channel: channelIds[0].channelId,
      content: content,
      senderId: userId,
    }).save();
    return Channel.findOneOrFail(channelIds[0].channelId);
  }

  @Mutation(() => Channel)
  async startChatWithApprovedApplicant(
    @Ctx() { req }: MyContext,
    @Arg("input") input: StartChatWithApprovedApplicantInput
  ) {
    const userId = req.session.userId;

    const job = await Job.findOneOrFail(input.jobId, {
      relations: ["approvedApplicant", "approvedApplicant.user"],
      select: ["approvedApplicant", "title", "shortDescription", "budget"],
    });
    const approvedApplicantUserId = job.approvedApplicant.user.id;

    const channelIds = await Channel.query(
      'SELECT DISTINCT userOne."channelId" FROM (SELECT * from channels_members where "userId" in ($1)) userOne INNER JOIN (SELECT * from channels_members where "userId" in ($2)) userTwo USING("channelId")',
      [userId, approvedApplicantUserId]
    );

    const content = `タイトル: ${job.title}\n 説明: ${job.shortDescription}\n バジェット: ${job.budget}`;
    await Message.create({
      channel: channelIds[0].channelId,
      content: content,
      senderId: userId,
    }).save();
    return Channel.findOneOrFail(channelIds[0].channelId);
  }

  @Mutation(() => Channel)
  async chatWithOwner(
    @Ctx() { req }: MyContext,
    @Arg("input") input: chatWithOwnerInput
  ) {
    const approvedApplicantUserId = req.session.userId;

    const job = await Job.findOneOrFail(input.jobId, {
      relations: [
        "solarPowerPlant",
        "solarPowerPlant.solarPowerPlantOwner",
        "solarPowerPlant.solarPowerPlantOwner.user",
      ],
      select: ["id", "solarPowerPlant", "title", "shortDescription", "budget"],
    });
    const ownerId = job.solarPowerPlant.solarPowerPlantOwner?.user.id;

    const channelIds = await Channel.query(
      'SELECT DISTINCT userOne."channelId" FROM (SELECT * from channels_members where "userId" in ($1)) userOne INNER JOIN (SELECT * from channels_members where "userId" in ($2)) userTwo USING("channelId")',
      [ownerId, approvedApplicantUserId]
    );

    const content = `No：${job.id}・タイトル：${job.title}・予算：${job.budget}`;

    await Message.create({
      channel: channelIds[0].channelId,
      content: content,
      senderId: approvedApplicantUserId,
    }).save();
    return Channel.findOneOrFail(channelIds[0].channelId);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine,
    @Arg("channelId") channelId: number,
    @Arg("content") content: string
  ): Promise<Message> {
    const userId = req.session.userId;
    const channel = await Channel.findOneOrFail(channelId, {
      relations: ["channelsMembers", "channelsMembers.user"],
    });
    const sender = channel.channelsMembers.find(
      (member) => member.userId === userId
    );
    const receivers = channel.channelsMembers.filter(
      (member) => member.userId !== userId
    );
    const message = await Message.create({
      senderId: userId,
      content: content,
      channel: channel,
    }).save();
    await pubSub.publish("NEW_MESSAGE", message);

    const body = `
       <p>${sender?.user.email} からメッセージを受け取りました</p>
       <p> ${content} </p>
    `;

    receivers.map((receiver) =>
      sendEmail(
        receiver.user.email,
        "新しいメッセージを受信しました",
        "新しいメッセージを受信しました",
        body
      )
    );
    return message;
  }

  @Mutation(() => Message)
  async uploadFile(
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine,
    @Arg("input", () => GraphQLUpload) input: FileUpload,
    @Arg("channelId") channelId: number
  ) {
    // Write the file to disk
    const baseLocation = path.resolve("./public/images/");
    const { createReadStream, filename } = input;
    const stream = createReadStream();
    const fileId = v4() + filename;
    const baseDir = path.join(
      baseLocation,
      "messageData",
      channelId.toString()
    );
    if (!existsSync(baseDir)) {
      mkdirSync(baseDir, { recursive: true });
    }
    const location = path.join(baseDir, fileId);
    const out = createWriteStream(location);
    stream.pipe(out);
    await finished(out);

    // Create a new file
    const newFile = await FileInfo.create({
      filename: filename,
      storageLocation: `https://api.ecopeer.net/images/messageData/${channelId}/${fileId}`,
    }).save();

    // Send a new message
    const userId = req.session.userId;
    const channel = await Channel.findOneOrFail(channelId);
    const message = await Message.create({
      senderId: userId,
      content: filename,
      channel: channel,
      uploadedFile: newFile,
    }).save();
    await pubSub.publish("NEW_MESSAGE", message);
    return message;
  }

  @Mutation(() => Boolean)
  async markChannelAsRead(
    @Arg("input") input: MarkChannelAsReadInput,
    @Ctx() ctx: MyContext
  ) {
    const userId = ctx.req.session.userId ? ctx.req.session.userId : -1;
    const channel = await Channel.findOneOrFail(input.channelId);
    await Message.update(
      { isRead: false, channel: channel, senderId: Not(userId) },
      { isRead: true }
    );
    return true;
  }

  // Subscriptions
  @Subscription({
    topics: "NEW_MESSAGE",
    filter: async ({ payload, args }) => payload.channel.id === args.channelId,
  })
  newMessage(
    @Root() messagePayload: Message,
    @Arg("channelId") channelId: number
  ): Message {
    console.log(channelId);
    return messagePayload;
  }
}
