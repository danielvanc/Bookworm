import { installGlobals } from "@remix-run/node";
import { setupServer } from "msw/node";
import matchers, {
  type TestingLibraryMatchers,
} from "@testing-library/jest-dom/matchers";
import { handlers } from "./mocks/handlers";

declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers);

installGlobals();
const server = setupServer(...handlers);

console.info("🔶 Mock server running");

server.listen();

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
