// TODO: Add typing
// @ts-nocheck
import * as redis from "redis";

// TODO: Add better caching functions

const options =
  process.env.NODE_ENV === "production"
    ? {
        url: process.env.REDIS_URL_PROD,
        port: process.env.REDIS_PORT_PROD,
        pass: process.env.REDIS_PASS_PROD,
      }
    : { url: process.env.REDIS_URL_LOCAL };

const client = redis.createClient(options);

client.on("error", (err) => console.log("Redis Client Error", err));

export { client };

export async function getCacheData(key) {
  await client.connect();
  const data = await client.get(key);
  await client.quit();
  return data;
}

export const saveToRedis = async (key, data) => {
  await client.connect();
  await client.set(key, JSON.stringify(data), { EX: 60 * 60 });
  await client.quit();
};
