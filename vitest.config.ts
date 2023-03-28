/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: [
      "./tests/integration/**/*.{ts,tsx}",
      "./tests/unit/**/*.{ts,tsx}",
    ],
    exclude: ["./tests/e2e/**/*.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      include: [
        "./tests/integration/**/*.{ts,tsx}",
        "./tests/unit/**/*.{ts,tsx}",
      ],
      all: true,
    },
  },
});
