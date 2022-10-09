// TODO: Add typing
// @ts-nocheck
import * as redis from "redis";

// TODO: Add better caching functions

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : process.env.REDIS_URL_LOCAL;

const client = redis.createClient(url);

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
