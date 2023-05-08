// const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "./public/build",
  publicPath: "/build/",
  ignoredRouteFiles: ["**/*"],
  ignoredFilePatterns: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  // ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  tailwind: true,
  future: {
    // unstable_dev: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_routeConvention: true,
  },
  serverModuleFormat: "cjs",
  // routes: (defineRoutes) => {
  //   // `createRoutesFromFolders` will create routes for all files in the
  //   // routes directory using the same default conventions as Remix v1.
  //   return createRoutesFromFolders(defineRoutes, {
  //     // If you're already using `ignoredRouteFiles` in your Remix config,
  //     // you can move them to `ignoredFilePatterns` in the plugin's options.
  //     ignoredFilePatterns: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  //     // ignoredFilePatterns: ["**/.*", "*.css", "*.test.{js,jsx,ts,tsx}"],
  //   });
  // },
};
