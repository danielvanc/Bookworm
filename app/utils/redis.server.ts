// TODO: Add typing
// @ts-nocheck
import * as redis from "redis";

// TODO: Add better caching functions

const client = redis.createClient({
  url: "redis://localhost:6379",
});

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
