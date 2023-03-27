/** @type {import('@jest/types').Config.InitialOptions} */
const path = require("path");
const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
  roots: ["<rootDir>"],
  resetMocks: true,
  coveragePathIgnorePatterns: [],
  collectCoverageFrom: ["**/app/**/*.{js,ts,tsx}"],
  coverageThreshold: null,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.js"],

  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@remix-run/web-fetch|@remix-run/web-blob|@remix-run/web-stream|@remix-run/web-form-data|@remix-run/web-file|@web3-storage/multipart-parser)/)",
  ],
  moduleNameMapper: {
    "~/(.*)": fromRoot("app/$1"),
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  modulePaths: ["<rootDir>"],
};
