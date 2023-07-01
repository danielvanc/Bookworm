const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "./public/build",
  publicPath: "/build/",
  ignoredRouteFiles: ["**/*"],
  tailwind: true,
  future: {
    v2_dev: true,
    v2_headers: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_routeConvention: true,
  },
  serverModuleFormat: "cjs",
  routes: (defineRoutes) => {
    return createRoutesFromFolders(defineRoutes, {
      ignoredFilePatterns: [".*", "**/*.test.{js,jsx,ts,tsx}"],
    });
  },
};
