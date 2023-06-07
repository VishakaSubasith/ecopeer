// import {
//   Arg,
//   Ctx,
//   Field,
//   InputType,
//   Mutation,
//   PubSub,
//   PubSubEngine,
//   Query,
//   Resolver,
//   Root,
//   Subscription,
// } from "type-graphql";
// import { MyContext } from "src/types";
// import { Message } from "../entities/Message";
// import { FileUpload, GraphQLUpload } from "graphql-upload";
// import { createWriteStream } from "fs";
// import { finished } from "stream/promises";
// import path from "path";
// import { FileInfo } from "../entities/FileInfo";

// @InputType()
// class MessageInput {
//   @Field()
//   content: string;

//   @Field()
//   receiver: number;

//   sender: number | undefined;
// }

// @Resolver()
// export class MessageResolver {
//   @Query(() => [Message])
//   async getMessages(
//     @Arg("senderId") senderId: Number,
//     @Ctx() { req }: MyContext
//   ): Promise<Message[] | null> {
//     if (!req.session.userId) {
//       return null;
//     }
//     const messages = await Message.find({
//       where: [
//         { receiver: req.session.userId, sender: senderId },
//         { sender: req.session.userId, receiver: senderId },
//       ],
//       relations: ["uploadedFile"],
//     });
//     return messages;
//   }

//   @Mutation(() => Message)
//   async sendMessage(
//     @Arg("input") input: MessageInput,
//     @Ctx() { req }: MyContext,
//     @PubSub() pubSub: PubSubEngine
//   ) {
//     input.sender = req.session.userId;
//     const message = await Message.create({ ...input }).save();
//     // here we can trigger subscriptions topics
//     // console.log("Pubsub: ", pubSub);
//     const payload: Message = message;
//     await pubSub.publish("NEW_MESSAGE", payload);
//     return message;
//   }

//   @Subscription({
//     topics: "NEW_MESSAGE",
//     filter: ({ payload, context, args }) => {
//       return (
//         (context.ctx.userId === payload.sender &&
//           args.receiverId === payload.receiver) ||
//         (context.ctx.userId === payload.receiver &&
//           args.receiverId === payload.sender)
//       );
//       // return true
//     },
//   })
//   newMessage(
//     @Root() messagePayload: Message,
//     @Arg("receiverId") receiverId: number
//   ): Message {
//     console.log(receiverId);
//     console.log(messagePayload);
//     return messagePayload;
//   }

//   @Mutation(() => Message)
//   async uploadFile(
//     @Arg("input", () => GraphQLUpload) input: FileUpload,
//     @Arg("receiver") receiver: number,
//     @Ctx() { req }: MyContext,
//     @PubSub() pubSub: PubSubEngine
//   ) {
//     const baseLocation = path.resolve("./public/images/");
//     console.log("asdasdasdasd", baseLocation);
//     const { createReadStream, filename } = input;
//     // const { createReadStream, filename, mimetype, encoding } = input;
//     const stream = createReadStream();
//     const location = path.join(baseLocation, filename);
//     console.log(location);
//     const out = createWriteStream(location);
//     stream.pipe(out);
//     await finished(out);

//     const newFile = await FileInfo.create({
//       filename: filename,
//       storageLocation: "https://api.ecopeer.net/images/" + filename,
//     }).save();

//     const message = await Message.create({
//       content: filename,
//       receiver: receiver,
//       sender: req.session.userId,
//       uploadedFile: newFile,
//     }).save();
//     // here we can trigger subscriptions topics
//     console.log("Pubsub: ", pubSub);
//     const payload: Message = message;
//     await pubSub.publish("NEW_MESSAGE", payload);
//     return message;
//   }
// }
