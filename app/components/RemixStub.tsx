import { RemixBrowser } from "@remix-run/react";
// Sourced from: https://github.com/remix-run/remix/discussions/2481

export function RemixStub({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  win.__remixManifest = {
    routes: {
      "routes/$": {
        id: "routes/$",
        path: "*",
      },
    },
  };
  win.__remixRouteModules = {
    "routes/$": {
      default: () => children,
    },
  };
  win.__remixContext = {
    appState: {},
    matches: [],
    routeData: {},
  };

  return <RemixBrowser />;
}
