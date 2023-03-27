import { installGlobals } from "@remix-run/node";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

installGlobals();
const server = setupServer(...handlers);

console.info("🔶 Mock server running");

server.listen();

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
