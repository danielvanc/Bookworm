// TODO: Add typing
// @ts-nocheck
import Redis from "ioredis";

// TODO: Add better caching functions

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : process.env.REDIS_URL_LOCAL;

const client = new Redis(url);

client.on("error", (err) => console.log("Redis Client Error", err));

export { client };

export async function getCacheData(key) {
  // await client.connect();
  const data = await client.get(key).then((result) => result);
  // await client.quit();
  return data;
}

export const saveToRedis = async (key, data) => {
  // await client.connect();
  // await client.set(key, JSON.stringify(data), { EX: 60 * 60 });
  await client.set(key, JSON.stringify(data), "EX", 60 * 60);
  // await client.quit();
};
