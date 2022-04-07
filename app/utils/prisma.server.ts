import { PrismaClient } from "@prisma/client";
// import chalk from "chalk";

// TODO: Look into below implementation and why we don't have connection issues. Refer to blue stack
let prisma: PrismaClient;
declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$connect();
  }
  prisma = global.prisma;
}

export { prisma };

// declare global {
//   var prisma: ReturnType<typeof getClient> | undefined;
// }

// const prisma = global.prisma ?? (global.prisma = getClient());

// const logThreshold = 50;

// function getClient() {
//   const client = new PrismaClient({
//     log: [
//       { level: "query", emit: "event" },
//       { level: "error", emit: "stdout" },
//       { level: "info", emit: "stdout" },
//       { level: "warn", emit: "stdout" },
//     ],
//   });

//   client.$on("query", (e) => {
//     if (e.duration < logThreshold) return;

//     const color =
//       e.duration < 30
//         ? "green"
//         : e.duration < 50
//         ? "blue"
//         : e.duration < 80
//         ? "yellow"
//         : e.duration < 100
//         ? "redBright"
//         : "red";
//     const dur = chalk[color](`${e.duration}ms`);
//     console.log(`prisma:query - ${dur} - ${e.query}`);
//   });

//   void client.$connect();

//   return client;
// }

// export { prisma };
