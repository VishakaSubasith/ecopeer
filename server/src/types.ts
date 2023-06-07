import { Request, Response } from "express";
import { RedisClient } from "redis";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

// declare module "connect-redis" {
//   interface SessionData {
//     userId: number;
//   }
// }

export type MyContext = {
  req: Request;
  res: Response;
  // connection: any;
  redisClient: RedisClient;
};
