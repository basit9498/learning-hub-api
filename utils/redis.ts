import { Redis } from "ioredis";
import { config } from "dotenv";
config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis Connected");
    return process.env.REDIS_URL;
  }
  console.log("process.env.REDIS_URL", process.env.REDIS_URL);
  throw new Error("Redis Connection Fail");
};

export const redis = new Redis(redisClient());
