import "@testing-library/jest-dom";
import * as globals from "@remix-run/node";
import { server } from "../mocks/setup";

globals.installGlobals();

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
