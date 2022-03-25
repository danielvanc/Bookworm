import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

declare global {
  var prismaRead: ReturnType<typeof getClient> | undefined;
}

const prismaRead = global.prismaRead ?? (global.prismaRead = getClient());
// const prismaWrite =
//   global.prismaWrite ?? (global.prismaWrite = getClient(primaryDB, "write"));

const logThreshold = 50;

function getClient() {
  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "info", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  });

  client.$on("query", (e) => {
    if (e.duration < logThreshold) return;

    const color =
      e.duration < 30
        ? "green"
        : e.duration < 50
        ? "blue"
        : e.duration < 80
        ? "yellow"
        : e.duration < 100
        ? "redBright"
        : "red";
    const dur = chalk[color](`${e.duration}ms`);
    console.log(`prisma:query - ${dur} - ${e.query}`);
  });

  void client.$connect();
  return client;
}

export { prismaRead };
