import "reflect-metadata";
import http from "http";
import compression from "compression";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import redis from "redis";
import session from "express-session";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME } from "./constants";
import { Area } from "./entities/Area";
import { Message } from "./entities/Message";
import { User } from "./entities/User";
import { Job } from "./entities/Job";
import { City } from "./entities/City";
import { Region } from "./entities/Region";
import { SolarPowerPlantMaintainer } from "./entities/SolarPowerPlantMaintainer";
import { Representative } from "./entities/Representative";
import { SolarPowerPlantOwner } from "./entities/SolarPowerPlantOwner";
import { SolarPowerPlant } from "./entities/SolarPowerPlant";
import { UserTransaction } from "./entities/UserTransactions";
import { UserResolver } from "./resolvers/User";
import { RegionResolver } from "./resolvers/Region";
import { PaymentTransactionResolver } from "./resolvers/PaymentTransaction";
import { JobResolver } from "./resolvers/Job";
import { AreaResolver } from "./resolvers/Area";
import { SolarPowerPlantOwnerResolver } from "./resolvers/SolarPowerPlantOwner";
import { UserTransactionResolver } from "./resolvers/UserTransactions";
import { SolarPowerPlantMaintainerResolver } from "./resolvers/SolarPowerPlantMaintainer";
import { SolarPowerPlantResolver } from "./resolvers/SolarPowerPlants";
import { MyContext } from "./types";
import { graphqlUploadExpress } from "graphql-upload";
import { FileInfo } from "./entities/FileInfo";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import { Channel } from "./entities/Channel";
import { ChannelResolver } from "./resolvers/Channel";
import { ChannelsMembers } from "./entities/ChannelsMembers";
import { JobApplications } from "./entities/JobApplications";
import { PaymentTransaction } from "./entities/PaymentTransaction";
import { JobStatus, PaymentStatus } from "./enums";
import { JobFileInfo } from "./entities/JobFileInfo";
import { FavoriteJobs } from "./entities/FavoriteJobs";
import { sendJobPaymentSuccessfulEmail } from "./utils/sendEmails";
import { AppNotificationResolver } from "./resolvers/AppNotificaion";
import { AppNotification } from "./entities/AppNotification";
import { Seminar } from "./entities/Seminar";
import { SeminarResolver } from "./resolvers/Seminar";
import { Question } from "./entities/Question";
import { Answer } from "./entities/Answer";
import { QAResolver } from "./resolvers/QA";
import { OffParty } from "./entities/OffParty";
import { OffPartyResolver } from "./resolvers/OffParty";
import { Rating } from "./entities/Rating";
import { RatingResolver } from "./resolvers/Rating";
import { BankDetailsResolver} from "./resolvers/BankDetails";
import { BankDetails} from "./entities/BankDetails";
import {ExchangeInformation} from "./entities/ExchangeInformation";
import {ExchangeInformationResolver} from "./resolvers/ExchangeInformation";

dotenv.config();

const main = async () => {
  const db_conn = await createConnection({
    type: "postgres",
    // type: "sqlite",
    url: process.env.DATABASE_URL,
    // database: 'database.sqlite',
    logging: true,
    entities: [
      User,
      SolarPowerPlantOwner,
      SolarPowerPlantMaintainer,
      SolarPowerPlant,
      Job,
      Representative,
      City,
      Region,
      Area,
      Message,
      UserTransaction,
      FileInfo,
      Channel,
      ChannelsMembers,
      JobApplications,
      PaymentTransaction,
      JobFileInfo,
      FavoriteJobs,
      AppNotification,
      Seminar,
      Question,
      Answer,
      OffParty,
      Rating,
      BankDetails,
      ExchangeInformation
    ],
  });

  await db_conn.runMigrations();

  // console.log(conn);
  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient(`${process.env.REDIS_URL}`);

  app.use(compression());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
      disableTTL: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
    secret: "hasdkjhaskdjhqwhdiuhwdkjh",
    resave: false,
    saveUninitialized: false,
  });

  app.use(sessionMiddleware);

  const schema = await buildSchema({
    resolvers: [
      SolarPowerPlantResolver,
      UserResolver,
      JobResolver,
      RegionResolver,
      SolarPowerPlantOwnerResolver,
      AreaResolver,
      SolarPowerPlantMaintainerResolver,
      UserTransactionResolver,
      ChannelResolver,
      PaymentTransactionResolver,
      AppNotificationResolver,
      SeminarResolver,
      QAResolver,
      OffPartyResolver,
      RatingResolver,
      BankDetailsResolver,
      ExchangeInformationResolver
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redisClient,
    }),
  });
  app.use(express.static("public"));
  app.use(graphqlUploadExpress());
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  const httpServer = http.createServer(app);

  // Handle payment gateway response
  const urlEncodedParser = express.urlencoded({ extended: false });
  app.post("/api/payment-post-checkout", urlEncodedParser, (req, res) => {
    const paymentStatusCode = parseInt(req.body.TRAN_REASON_CODE);
    const transactionId = req.body.CTRL_NO;
    if (paymentStatusCode !== 0) {
      (async () => {
        const transaction = await PaymentTransaction.findOneOrFail({
          where: { transactionId },
        });
        transaction.status = PaymentStatus.Failed;
        await transaction.save();
        res.redirect("https://ecopeer.net/job/payment/failed");
      })();
    } else {
      (async () => {
        const transaction = await PaymentTransaction.findOneOrFail({
          where: { transactionId },
          relations: ["job"],
        });
        transaction.status = PaymentStatus.Successful;
        await transaction.save();
        const job = await Job.findOneOrFail(transaction.job.id);
        job.status = JobStatus.WaitingForCompletion;
        await job.save();
        sendJobPaymentSuccessfulEmail(transactionId);
        res.redirect("https://ecopeer.net/job/payment/successful");
      })();
    }
  });

  // Start the server
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    const wsServer = new ws.Server({
      server: httpServer,
    });

    // wsServer.on("connection", (stream) => {
    //   console.log("Someone connected!")
    //   console.log(stream)
    // })

    // wsServer.on("connection", (ws, req) => {
    //   // ws.upgradeReq = req;
    //   console.log(ws)
    //   console.log("*******************Req*******************")
    //   console.log(req)
    //   console.log("*******************Req*******************")
    // })

    useServer(
      {
        schema,
        context: (ctx, msg, args) => {
          let userId = null;
          if (!ctx.extra.request.headers.cookie) {
            return { ctx, msg, args };
          }
          const cookies = cookie.parse(ctx.extra.request.headers.cookie);
          const sid = cookieParser.signedCookie(
            cookies[COOKIE_NAME],
            "hasdkjhaskdjhqwhdiuhwdkjh"
          );

          if (!sid) {
            return { ctx, msg, args };
          }
          const result = redisClient.get("sess:" + sid, (_, val) => {
            if (val) {
              const parseVal = JSON.parse(val);
              userId = parseVal.userId;
              console.log(userId);
              const context: any = ctx;
              context.userId = userId;
              return { context, msg, args };
            } else {
              return { ctx, msg, args };
            }
          });
          console.log(result);
          return { ctx, msg, args };
        },
        // context: (ctx, msg, args) => {
        //   let a: any;
        //   sessionMiddleware(ctx.extra.request as any, {} as any, (next) => {
        //     a = ctx.extra.request;
        //     console.log(a)
        //     next();
        //     console.log({ context: { userId: a.session.userId }, msg, args })

        //   });
        //   return { context: { userId: a.session.userId }, msg, args };
        // },
      },
      wsServer
    );
  });
};

main().catch((err) => console.log(err));
