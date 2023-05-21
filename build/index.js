var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// node_modules/@remix-run/dev/dist/config/defaults/node/entry.server.react-stream.tsx
var entry_server_react_stream_exports = {};
__export(entry_server_react_stream_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node"), import_react3 = require("@remix-run/react");

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-KM7CNWIY.css";

// app/utils/seo.ts
function getMetaInfo({
  title = "Bookworm - Read more!",
  description = "The Bookapp for book lovers",
  keywords = "books, book, reading"
}) {
  return {
    title,
    description,
    keywords
    // image,
  };
}

// app/auth/auth.server.ts
var import_auth_helpers_remix = require("@supabase/auth-helpers-remix"), import_tiny_invariant = __toESM(require("tiny-invariant")), SUCCESS_REDIRECT = "/home", FAILURE_REDIRECT = "/login";
function createSupabaseClient(request) {
  let { SUPABASE_URL, SUPABASE_KEY } = process.env, response = new Response();
  return (0, import_tiny_invariant.default)(SUPABASE_URL, "SUPABASE_URL is required"), (0, import_tiny_invariant.default)(SUPABASE_KEY, "SUPABASE_KEY is required"), { supabaseClient: (0, import_auth_helpers_remix.createServerClient)(SUPABASE_URL, SUPABASE_KEY, {
    request,
    response
  }), response };
}
async function getSession(request) {
  let { supabaseClient, response } = createSupabaseClient(request), {
    data: { session },
    error
  } = await supabaseClient.auth.getSession();
  return { session, error, response };
}
async function closeSession(request) {
  let { supabaseClient, response } = createSupabaseClient(request), { error } = await supabaseClient.auth.signOut();
  return { error, response };
}

// app/auth/client.ts
var React = __toESM(require("react")), import_react2 = require("@remix-run/react"), import_supabase_js = require("@supabase/supabase-js"), import_auth_helpers_remix2 = require("@supabase/auth-helpers-remix"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
function useWatchSession(initialSession) {
  let [supabase, setSupabase] = React.useState(null), [session, setSession] = React.useState(initialSession), { revalidate } = (0, import_react2.useRevalidator)(), context = { supabase, session }, serverAccessToken = session == null ? void 0 : session.access_token;
  return React.useEffect(() => {
    if ((0, import_tiny_invariant2.default)(window.env.SUPABASE_URL, "SUPABASE_URL is required"), (0, import_tiny_invariant2.default)(window.env.SUPABASE_KEY, "SUPABASE_KEY is required"), !supabase) {
      let supabaseClient = (0, import_auth_helpers_remix2.createBrowserClient)(
        window.env.SUPABASE_URL,
        window.env.SUPABASE_KEY
      );
      setSupabase(supabaseClient);
      let {
        data: { subscription }
      } = supabaseClient.auth.onAuthStateChange((_, session2) => {
        (session2 == null ? void 0 : session2.access_token) !== serverAccessToken && (revalidate(), setSession(session2));
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [revalidate, serverAccessToken, supabase]), context;
}

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function meta() {
  return [
    { charset: "utf-8" },
    { viewport: "width=device-width,initial-scale=1" },
    { ...getMetaInfo({ title: "Welcome to BKWorm!" }) }
  ];
}
function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com?crossOrigin=true" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:wght@600&family=Source+Serif+Pro:wght@400;700&display=swap&crossOrigin=true"
    },
    { rel: "stylesheet", href: tailwind_default }
  ];
}
var loader = async ({ request }) => {
  let { SUPABASE_URL, SUPABASE_KEY, NODE_ENV } = process.env, { session, error, response } = await getSession(request);
  return (0, import_node2.json)({
    session,
    error,
    env: {
      SUPABASE_URL,
      SUPABASE_KEY,
      APP_ENV: NODE_ENV
    },
    headers: response.headers
  });
};
function App() {
  let { env, session } = (0, import_react3.useLoaderData)(), context = useWatchSession(session), isLoggedIn = session == null ? void 0 : session.user;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", className: isLoggedIn ? "h-full bg-gray-100" : "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { className: `font-serifPro ${isLoggedIn ? "h-full" : "flex flex-col h-full"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Outlet, { context }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `window.env = ${JSON.stringify(env)}`
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Scripts, {}),
      !1
    ] })
  ] });
}
function ErrorBoundary() {
  return (0, import_react3.useRouteError)() === 404 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("title", { children: "You 404'd" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { className: "bg-gray", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "You came to the wrong place, dude!" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react3.Scripts, {})
    ] })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Boom!" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "Houston we have a problem with the mainframe" })
  ] });
}

// app/routes/oauth.callback.tsx
var oauth_callback_exports = {};
__export(oauth_callback_exports, {
  action: () => action,
  default: () => OAuth
});
var React2 = __toESM(require("react")), import_node3 = require("@remix-run/node"), import_react4 = require("@remix-run/react"), import_auth_helpers_remix3 = require("@supabase/auth-helpers-remix");
var action = async ({ request }) => {
  let { session, response } = await getSession(request);
  return (0, import_node3.redirect)(session ? SUCCESS_REDIRECT : FAILURE_REDIRECT, {
    headers: response.headers
  });
};
function OAuth() {
  let fetcher = (0, import_react4.useFetcher)(), [supabase, setSupabase] = React2.useState(null);
  return React2.useEffect(() => {
    if (!supabase) {
      let supabaseClient = (0, import_auth_helpers_remix3.createBrowserClient)(
        window.env.SUPABASE_URL,
        window.env.SUPABASE_KEY
      );
      setSupabase(supabaseClient);
      let {
        data: { subscription }
      } = supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
          let formData = new FormData();
          formData.append("session", JSON.stringify(session)), fetcher.submit(formData, { method: "post" });
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, []), null;
}

// app/routes/__home.tsx
var home_exports = {};
__export(home_exports, {
  default: () => Home,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node"), React4 = __toESM(require("react")), import_react9 = require("@remix-run/react"), import_outline3 = require("@heroicons/react/24/outline");

// app/utils/index.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// app/components/Header.tsx
var import_react5 = __toESM(require("react")), import_react6 = require("@remix-run/react"), import_react7 = require("@headlessui/react"), import_outline = require("@heroicons/react/24/outline"), import_outline2 = require("@heroicons/react/24/outline");

// app/components/BlankAvatar.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function BlankAvatar() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "#fff",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: "h-10 w-10",
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        }
      )
    }
  );
}

// app/components/Header.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), userNavigation = [{ name: "Coming soon..", href: "#" }], navigation = [
  { name: "Home", href: "#", icon: import_outline2.HomeIcon, current: !0 },
  { name: "Popular", href: "#", icon: import_outline.FireIcon, current: !1 },
  { name: "Communities", href: "#", icon: import_outline.UserGroupIcon, current: !1 },
  { name: "Trending", href: "#", icon: import_outline.ArrowTrendingUpIcon, current: !1 }
];
function Header({ name, email, avatar }) {
  let { supabase } = (0, import_react6.useOutletContext)();
  async function handleLogout() {
    await supabase.auth.signOut();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_react7.Popover,
    {
      as: "header",
      className: ({ open }) => classNames(
        open ? "fixed inset-0 z-40 overflow-y-auto" : "bg-rosyWorm",
        " shadow-sm lg:static lg:overflow-y-visible"
      ),
      children: ({ open }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            className: `${open ? "bg-rosyWorm" : ""} max-w-screen-desktopMax mx-auto px-4 sm:px-6 lg:px-8`,
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex flex-shrink-0 items-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "/", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "img",
                {
                  src: "/images/logo_header.svg",
                  alt: "BKWorm - Book app for book lovers!",
                  className: "block h-8 w-auto"
                }
              ) }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-7", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center px-6 py-10 md:mx-auto md:max-w-xl lg:mx-0 lg:max-w-none xl:px-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hidden w-full", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { htmlFor: "search", className: "sr-only", children: "Search" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    import_outline.MagnifyingGlassIcon,
                    {
                      className: "h-5 w-5 text-gray-400",
                      "aria-hidden": "true"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "input",
                    {
                      id: "search",
                      name: "search",
                      className: "block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-rose-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm",
                      placeholder: "Search",
                      type: "search"
                    }
                  )
                ] })
              ] }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react7.Popover.Button, { className: "-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "sr-only", children: "Open menu" }),
                open ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_outline2.XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_outline2.Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "hidden lg:flex lg:items-center lg:justify-end xl:col-span-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react7.Menu, { as: "div", className: "relative ml-5 flex-shrink-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react7.Menu.Button, { className: "ring-offset- to-blue-400focus:outline-none focus:white bg-rosyWorm flex rounded-full  ring-2 ring-pink-400 focus:ring-2 focus:ring-white", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "sr-only", children: "Open user menu" }),
                    avatar !== "" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "img",
                      {
                        className: "h-10 w-10 rounded-full p-1",
                        src: avatar,
                        alt: ""
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlankAvatar, {})
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    import_react7.Transition,
                    {
                      as: import_react5.default.Fragment,
                      enter: "transition ease-out duration-100",
                      enterFrom: "transform opacity-0 scale-95",
                      enterTo: "transform opacity-100 scale-100",
                      leave: "transition ease-in duration-75",
                      leaveFrom: "transform opacity-100 scale-100",
                      leaveTo: "transform opacity-0 scale-95",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react7.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: userNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react7.Menu.Item, { children: ({ active }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "a",
                        {
                          href: item.href,
                          className: classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          ),
                          children: item.name
                        }
                      ) }, item.name)) })
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    onClick: handleLogout,
                    className: "ml-6 inline-flex items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2",
                    children: "Logout"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react7.Popover.Panel, { as: "nav", className: "lg:hidden", "aria-label": "Global", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4", children: navigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              href: item.href,
              "aria-current": item.current ? "page" : void 0,
              className: classNames(
                item.current ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50",
                "block rounded-md px-3 py-2 text-base font-medium"
              ),
              children: item.name
            },
            item.name
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "border-t border-gray-200 pt-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mx-auto flex max-w-3xl items-center px-4 sm:px-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-shrink-0", children: avatar != "" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "img",
                {
                  className: "h-10 w-10 rounded-full",
                  src: avatar,
                  alt: ""
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlankAvatar, {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ml-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-base font-medium text-gray-800", children: name }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-sm font-medium text-gray-500", children: email })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                "button",
                {
                  type: "button",
                  className: "ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "sr-only", children: "View notifications" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_outline2.BellIcon, { className: "h-6 w-6", "aria-hidden": "true" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4", children: userNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "a",
              {
                href: item.href,
                className: "block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                children: item.name
              },
              item.name
            )) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mx-auto mt-6 max-w-3xl px-4 sm:px-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "a",
            {
              href: "http",
              className: "flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700",
              children: "New Post"
            }
          ) })
        ] })
      ] })
    }
  );
}

// app/components/TabNavigation.tsx
var import_react8 = require("@remix-run/react"), import_jsx_runtime5 = require("react/jsx-runtime"), defaultLinkStyles = "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10", defaultSpanStyles = "absolute inset-x-0 bottom-0 h-0.5", activeLinkStyles = `text-gray-900 ${defaultLinkStyles}`, activeLinkSpanStyles = `bg-rose-500  ${defaultSpanStyles}`;
function TabNavigation({ tabs: tabs2, optimisticPath }) {
  var _a;
  function appendBorders(isActive, idx) {
    let borderLeftStyle = idx === 0 ? "rounded-l-lg" : "", borderRightStyle = idx === tabs2.length - 1 ? "rounded-r-lg" : "";
    return `${isActive ? `${activeLinkStyles}` : `text-gray-500 hover:text-gray-700 ${defaultLinkStyles}`} ${borderLeftStyle} ${borderRightStyle}`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "px-4 sm:px-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "sm:hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { htmlFor: "question-tabs", className: "sr-only", children: "Select a tab" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "select",
        {
          id: "question-tabs",
          className: "block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500",
          defaultValue: (_a = tabs2.find((tab) => tab.current)) == null ? void 0 : _a.name,
          children: tabs2.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { children: tab.name }, tab.name))
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "hidden sm:block", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "nav",
      {
        className: "relative z-0 flex divide-x divide-gray-200 rounded-lg shadow",
        "aria-label": "Tabs",
        children: tabs2.map((tab, tabIdx) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          import_react8.NavLink,
          {
            to: tab.href,
            "aria-current": tab.current ? "page" : void 0,
            className: ({ isActive }) => appendBorders(isActive, tabIdx),
            children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: tab.name }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "span",
                {
                  "aria-hidden": "true",
                  className: isActive && !optimisticPath || optimisticPath && optimisticPath === `/${tab.href}` ? activeLinkSpanStyles : `bg-transparent ${defaultSpanStyles}`
                }
              )
            ] })
          },
          tab.name
        ))
      }
    ) })
  ] });
}

// app/components/LoadingUI/PreviewBookItemSkeleton.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function PreviewBookItemSkeleton({
  blocksToShow = 3
}) {
  let blocks = Array.from({ length: blocksToShow }, (_, i) => i);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: blocks.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "div",
    {
      className: "relative mb-6 flex animate-pulse flex-col divide-y divide-gray-200 rounded-lg bg-white shadow",
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col items-start p-8 md:flex-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mx-auto h-60 w-1/5 flex-shrink-0 rounded-lg bg-gray-300 shadow-md", children: "\xA0" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-4/5 py-5 md:py-0 md:pl-10 md:pr-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "h-10 w-full animate-pulse rounded bg-gray-300", children: "\xA0" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-3 h-6 w-7 animate-pulse rounded bg-gray-300", children: "\xA0" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-4 h-6 w-full animate-pulse rounded bg-gray-300", children: "\xA0" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-4 h-6 w-full animate-pulse rounded bg-gray-300", children: "\xA0" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-4 h-6 w-full animate-pulse rounded bg-gray-300", children: "\xA0" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mt-4 h-6 w-full animate-pulse rounded bg-gray-300", children: "\xA0" })
        ] })
      ] })
    },
    `s-${idx}`
  )) });
}

// app/routes/__home.tsx
var import_auth_helpers_remix4 = require("@supabase/auth-helpers-remix"), import_jsx_runtime7 = require("react/jsx-runtime"), tabs = [
  { name: "Discover", href: "home", current: !0 },
  { name: "Bookmarked", href: "bookmarks", current: !1 },
  { name: "Read / Reading", href: "read", current: !1 }
], loader2 = async ({ request }) => {
  let { session, error, response } = await getSession(request);
  if (!(session != null && session.user))
    return (0, import_node4.redirect)(FAILURE_REDIRECT);
  let env = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  };
  return (0, import_node4.json)({
    env,
    session,
    error,
    headers: response.headers
  });
};
function Home() {
  var _a;
  let { env, session } = (0, import_react9.useLoaderData)(), transition = (0, import_react9.useNavigation)(), refreshFetcher = (0, import_react9.useFetcher)(), paths = ["/home", "/bookmarks", "/read"], isLoading = (transition == null ? void 0 : transition.state) === "loading" && paths.includes(transition.location.pathname), userData = (session == null ? void 0 : session.user.user_metadata) || {}, name = userData != null && userData.full_name ? userData == null ? void 0 : userData.full_name.split(" ")[0] : userData.email, email = userData.email, avatar = (userData == null ? void 0 : userData.avatar_url) || "", navigation2 = [
    { name: "Home", href: "/home", icon: import_outline3.HomeIcon, current: !0 }
  ], { revalidate } = (0, import_react9.useRevalidator)(), [supabase] = React4.useState(
    () => (0, import_auth_helpers_remix4.createBrowserClient)(env.SUPABASE_URL, env.SUPABASE_KEY)
  ), serverAccessToken = session == null ? void 0 : session.access_token;
  return React4.useEffect(() => {
    let {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session2) => {
      (session2 == null ? void 0 : session2.access_token) !== serverAccessToken && refreshFetcher.state === "idle" && revalidate();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [refreshFetcher, revalidate, serverAccessToken, supabase]), /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "min-h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Header, { name, email, avatar }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "py-10", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "lg:max-w-screen-desktopMax mx-auto max-w-3xl sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "hidden lg:col-span-3 lg:block xl:col-span-2", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "nav",
        {
          "aria-label": "Sidebar",
          className: "sticky top-4 divide-y divide-gray-300",
          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "space-y-1 pb-8", children: navigation2.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "a",
            {
              href: item.href,
              className: classNames(
                item.current ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-50",
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
              ),
              "aria-current": item.current ? "page" : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  item.icon,
                  {
                    className: classNames(
                      item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                    ),
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "truncate", children: item.name })
              ]
            },
            item.name
          )) })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("main", { className: "lg:col-span-9", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          TabNavigation,
          {
            tabs,
            optimisticPath: (_a = transition == null ? void 0 : transition.location) == null ? void 0 : _a.pathname
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "mt-4", children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PreviewBookItemSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react9.Outlet, {}) })
      ] }) })
    ] }) })
  ] });
}

// app/routes/__home/bookmarks.tsx
var bookmarks_exports = {};
__export(bookmarks_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  default: () => Bookmarks,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node"), import_react11 = require("@remix-run/react");

// app/utils/redis.server.ts
var import_ioredis = __toESM(require("ioredis")), url = process.env.REDIS_URL, client = new import_ioredis.default(url);
client.on("error", (err) => console.log("Redis Client Error", err));
async function getCacheData(key) {
  return await client.get(key).then((result) => result);
}
var saveToRedis = async (key, data) => {
  await client.set(key, JSON.stringify(data), "EX", 60 * 60);
};

// app/utils/prisma.server.ts
var import_client2 = require("@prisma/client"), prisma;
prisma = new import_client2.PrismaClient(), prisma.$connect();

// app/config.ts
var config_default = {
  API: {
    ALL_BOOKS: "https://www.googleapis.com/books/v1/volumes?q=",
    BOOK: "https://www.googleapis.com/books/v1/volumes/"
  }
};

// app/models/books.server.ts
var initialBookData = (data) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  return {
    id: data.id,
    title: (_a = data.volumeInfo) == null ? void 0 : _a.title,
    description: (_b = data.volumeInfo) == null ? void 0 : _b.description,
    image: (_d = (_c = data.volumeInfo) == null ? void 0 : _c.imageLinks) == null ? void 0 : _d.thumbnail,
    link: (_e = data.volumeInfo) == null ? void 0 : _e.canonicalVolumeLink,
    authors: (_f = data.volumeInfo) == null ? void 0 : _f.authors,
    publisher: (_g = data.volumeInfo) == null ? void 0 : _g.publisher,
    publishedDate: (_h = data.volumeInfo) == null ? void 0 : _h.publishedDate,
    printedPageCount: (_i = data.volumeInfo) == null ? void 0 : _i.printedPageCount,
    categories: (_j = data.volumeInfo) == null ? void 0 : _j.categories,
    eBook: (_k = data.saleInfo) == null ? void 0 : _k.isEbook,
    price: (_m = (_l = data.saleInfo) == null ? void 0 : _l.retailPrice) == null ? void 0 : _m.amount
  };
};
function createBookmark(id, book_id, user_id) {
  return id ? prisma.books.update({
    where: {
      id
    },
    data: {
      bookmarked: !0
    }
  }) : prisma.books.create({
    data: {
      user_id,
      book_id,
      read: !1,
      reading: !1,
      watching: !1,
      bookmarked: !0
    }
  });
}
function removeBookmark(id) {
  return prisma.books.update({
    where: {
      id
    },
    data: {
      bookmarked: !1
    }
  });
}
function markAsRead(id, book_id, user_id) {
  return id ? prisma.books.upsert({
    create: {
      user_id,
      book_id,
      read: !0,
      reading: !1,
      watching: !1,
      bookmarked: !1
    },
    where: {
      id
    },
    update: {
      reading: !1,
      read: !0
    }
  }) : prisma.books.create({
    data: {
      user_id,
      book_id,
      read: !0,
      reading: !1,
      watching: !1,
      bookmarked: !1
    }
  });
}
function markAsNotRead(id) {
  return prisma.books.update({
    where: {
      id
    },
    data: {
      read: !1
    }
  });
}
function markAsReading(id, book_id, user_id) {
  return id ? prisma.books.upsert({
    create: {
      user_id,
      book_id,
      read: !1,
      reading: !0,
      watching: !1,
      bookmarked: !1
    },
    where: {
      id
    },
    update: {
      reading: !0,
      read: !1
    }
  }) : prisma.books.create({
    data: {
      user_id,
      book_id,
      read: !1,
      reading: !0,
      watching: !1,
      bookmarked: !1
    }
  });
}
function markAsNotReading(id) {
  return prisma.books.update({
    where: {
      id
    },
    data: {
      reading: !1
    }
  });
}
async function getAllRead(id) {
  var _a;
  let bookmarks = [], bookIds = await prisma.profile.findUnique({
    where: {
      id
    },
    include: {
      books: !0
    }
  }), usersBookmarks = ((_a = bookIds == null ? void 0 : bookIds.books) == null ? void 0 : _a.filter((book) => book.read || book.reading).map((book) => {
    let { id: buid, book_id: id2, reading, read, bookmarked } = book;
    return { buid, id: id2, reading, read, bookmarked };
  })) || [];
  return usersBookmarks.length && (bookmarks = await getAllBooksmarkData(usersBookmarks)), { userId: id, bookmarks };
}
async function getBookmarks(id) {
  var _a;
  let bookmarks = [], bookIds = await prisma.profile.findUnique({
    where: {
      id
    },
    include: {
      books: !0
    }
  }), usersBookmarks = ((_a = bookIds == null ? void 0 : bookIds.books) == null ? void 0 : _a.filter((book) => book.bookmarked).map((book) => {
    let { id: buid, book_id: id2, reading, read, bookmarked } = book;
    return { buid, id: id2, reading, read, bookmarked };
  })) || [];
  return usersBookmarks.length && (bookmarks = await getAllBooksmarkData(usersBookmarks)), { userId: id, bookmarks };
}
async function getUsersBookmarks(user_id) {
  let bookIds = await prisma.books.findMany({
    where: {
      user_id
    }
  });
  return (bookIds == null ? void 0 : bookIds.map((book) => {
    let { id: buid, book_id: id, reading, read, bookmarked } = book;
    return { buid, id, reading, read, bookmarked };
  })) || [];
}
async function getLatestBooks(userId, total) {
  var _a;
  let api = `${config_default.API.ALL_BOOKS}""&maxResults=${total}` || "", latestBooks, usersBookmarks = [], cacheEntry = await getCacheData("home-latest-books");
  if (cacheEntry) {
    let c0 = (/* @__PURE__ */ new Date()).getTime(), parsedCache = JSON.parse(cacheEntry).filter(
      (item) => !item.source && !item.responseTime
    ), c1 = (/* @__PURE__ */ new Date()).getTime();
    latestBooks = [
      ...parsedCache,
      { source: "cache" },
      { responseTime: `${c1 - c0}ms` }
    ];
  } else {
    let t0 = (/* @__PURE__ */ new Date()).getTime(), data = await fetch(api).then((res) => res.json()), t1 = (/* @__PURE__ */ new Date()).getTime(), allBooks = [...(_a = data == null ? void 0 : data.items) == null ? void 0 : _a.map((book) => initialBookData(book))];
    allBooks.push({ source: "api" }), latestBooks = [...allBooks, { responseTime: `${t1 - t0}ms` }], saveToRedis("home-latest-books", latestBooks);
  }
  let bookmarkIds = await getUsersBookmarks(userId);
  return bookmarkIds.length && (usersBookmarks = await getAllBooksmarkData(bookmarkIds)), { books: latestBooks, usersBookmarks };
}
async function fetchBookInfo(bookId) {
  let result = await fetch(`${config_default.API.BOOK}${bookId}`).then(
    (res) => res.json()
  );
  return initialBookData(result);
}
async function getAllBooksmarkData(bookmarkIds) {
  return Promise.all(
    bookmarkIds.map(async (book) => {
      let data = await fetchBookInfo(book.id);
      return data.buid = book.buid, data.read = book.read, data.reading = book.reading, data.bookmarked = book.bookmarked, data;
    })
  );
}

// app/components/BookItemFooter.tsx
var import_react10 = require("@remix-run/react"), import_solid = require("@heroicons/react/20/solid");

// app/components/icons/Done.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function Done({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "svg",
    {
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "path",
        {
          fillRule: "evenodd",
          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
          clipRule: "evenodd"
        }
      )
    }
  );
}

// app/components/BookItemFooter.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function BookItemFooter({
  buid,
  bookId,
  userId,
  isBookmarked,
  isReading,
  isRead,
  showReadMore = !0,
  classNames: classNames2 = ""
}) {
  var _a, _b;
  let statusFetcher = (0, import_react10.useFetcher)(), isIdle = statusFetcher.state === "idle", failedUpdate = ((_a = statusFetcher.data) == null ? void 0 : _a.error) && isIdle, action5 = (_b = statusFetcher.data) == null ? void 0 : _b.action, subData = statusFetcher.formData, ErrorMessage = "Error, please retry", isBookmarkAction = action5 === "create" || action5 === "remove-bookmark", isReadingAction = action5 === "remove-reading" || action5 === "reading", isReadAction = action5 === "remove-read" || action5 === "read", isAddingBookmark = (subData == null ? void 0 : subData.get("_action")) === "create", isRemovingBookmark = (subData == null ? void 0 : subData.get("_action")) === "remove-bookmark", isReadingUpdate = (subData == null ? void 0 : subData.get("_action")) === "reading", isNotReadingUpdate = (subData == null ? void 0 : subData.get("_action")) === "remove-reading", isReadUpdate = (subData == null ? void 0 : subData.get("_action")) === "read", isNotReadUpdate = (subData == null ? void 0 : subData.get("_action")) === "remove-read", bookmarkButtonStyles = `relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 ${(isBookmarked || isAddingBookmark) && !isRemovingBookmark ? "bg-gray-100 focus:border-x-pink-300 focus:ring-pink-300 text-gray-500 " : "text-gray-700 hover:bg-gray-50 focus:ring-gray-900 bg-white focus:border-x-rosyWorm-900 border-gray-300"}`;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "-mt-px flex divide-x-2 divide-gray-200", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "div",
      {
        className: `flex w-0 flex-1 items-center py-4 ${classNames2 || "justify-center"}`,
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(statusFetcher.Form, { method: "post", action: "/home", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "hidden", name: "buid", value: buid }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "hidden", name: "book_id", value: bookId }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { type: "hidden", name: "user_id", value: userId }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "input",
            {
              type: "hidden",
              name: "isBookmarked",
              value: isBookmarked.toString()
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "isolate inline-flex rounded-md shadow-sm", children: [
            isAddingBookmark || isRemovingBookmark ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "button",
              {
                disabled: !0,
                name: "_action",
                value: "",
                type: "submit",
                className: bookmarkButtonStyles,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_solid.BookmarkIcon,
                    {
                      className: `-ml-1 mr-2 h-5 w-5 ${isAddingBookmark ? "text-orange-300" : "text-gray-400"}`,
                      "aria-hidden": "true"
                    }
                  ),
                  isAddingBookmark ? "Bookmarked" : "Bookmark"
                ]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "button",
              {
                name: "_action",
                value: `${isBookmarked ? "remove-bookmark" : "create"}`,
                type: "submit",
                className: `${bookmarkButtonStyles} ${failedUpdate && isBookmarkAction ? "text-red-800" : ""}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                    import_solid.BookmarkIcon,
                    {
                      className: `-ml-1 mr-2 h-5 w-5 ${isBookmarked ? "text-orange-300" : "text-gray-400"}`,
                      "aria-hidden": "true"
                    }
                  ),
                  failedUpdate && action5 === "create" ? ErrorMessage : isBookmarked ? "Bookmarked" : "Bookmark"
                ]
              }
            ),
            isReadingUpdate || isNotReadingUpdate ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "button",
              {
                name: "_action",
                value: "",
                type: "submit",
                disabled: !0,
                className: "relative -ml-px inline-flex items-center border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
                children: isReadingUpdate ? "Reading" : "Not Reading"
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "button",
              {
                name: "_action",
                value: `${isReading ? "remove-reading" : "reading"}`,
                type: "submit",
                className: `relative -ml-px inline-flex items-center border border-gray-300  px-2 py-2 text-sm font-medium sm:px-4 ${isReading && !isReadUpdate ? "bg-gray-100 text-gray-500" : "bg-white text-gray-700 hover:bg-gray-50"}   focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${failedUpdate && isReadingAction ? "text-red-800" : ""}`,
                children: failedUpdate && action5 === "reading" ? ErrorMessage : isReading && !isReadUpdate ? "Reading" : "Not Started"
              }
            ),
            isReadUpdate || isNotReadUpdate ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "button",
              {
                name: "_action",
                value: "",
                type: "submit",
                disabled: !0,
                className: "relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
                children: [
                  isReadUpdate ? "Read" : "Not Finished",
                  isReadUpdate && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Done, { className: "-mr-2 ml-2 h-5 w-5 text-gray-400" })
                ]
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "button",
              {
                name: "_action",
                value: `${isRead ? "remove-read" : "read"}`,
                type: "submit",
                className: `relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm sm:px-4 ${isRead && !isReadingUpdate ? "bg-gray-100 text-gray-500" : "bg-white text-gray-700 hover:bg-gray-50"}   focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${failedUpdate && isReadAction ? "text-red-800" : ""}`,
                children: [
                  failedUpdate && isReadAction ? ErrorMessage : isRead && !isReadingUpdate ? "Read" : "Not Finished",
                  isRead && !isReadingUpdate && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Done, { className: "-mr-1 ml-2 h-5 w-5 text-gray-400 sm:-mr-2" })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    showReadMore ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "-ml-px flex w-0 flex-1 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      import_react10.Link,
      {
        to: `/book/${bookId}`,
        prefetch: "intent",
        type: "button",
        className: "relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
        children: "Read more..."
      }
    ) }) : null
  ] }) });
}

// app/components/PreviewBookItem.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function PreviewBookItem({
  book,
  usersBookmarks,
  userId
}) {
  let bookId = book.id, userBookmark = usersBookmarks.find(
    (bookmark) => bookmark.id === bookId
  ), buid = userBookmark == null ? void 0 : userBookmark.buid, isBookmarked = (userBookmark == null ? void 0 : userBookmark.bookmarked) ?? !1, isReading = (userBookmark == null ? void 0 : userBookmark.reading) ?? !1, isRead = (userBookmark == null ? void 0 : userBookmark.read) ?? !1;
  return !book.image || !book.title ? null : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "li",
    {
      className: "flex flex-col divide-y divide-gray-200 rounded-lg bg-white shadow",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col items-start p-8 md:flex-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "w-1/5", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "img",
            {
              className: "mx-auto w-full flex-shrink-0 rounded-lg shadow-md md:object-cover",
              src: book.image,
              alt: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "w-4/5 py-5 md:py-0 md:px-10", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h3", { className: "text-xl font-black text-gray-700", children: book.title }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("dl", { className: "mt-1 flex flex-grow flex-col justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dd", { className: "mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800", children: book.title }) }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "dd",
                {
                  className: "text-md text-gray-500",
                  dangerouslySetInnerHTML: { __html: book.description }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dt", { className: "sr-only", children: "Role" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          BookItemFooter,
          {
            buid,
            bookId,
            userId,
            isBookmarked,
            isReading,
            isRead
          }
        )
      ]
    },
    book.id
  );
}

// app/routes/__home/bookmarks.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
async function loader3({ request }) {
  let { session } = await getSession(request);
  if (!session)
    return (0, import_node5.redirect)(FAILURE_REDIRECT);
  let userId = session.user.id, { bookmarks } = await getBookmarks(userId);
  return (0, import_node5.json)({ userId, bookmarks });
}
function Bookmarks() {
  let { userId, bookmarks } = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { className: "font-monty sr-only text-xl", children: "Discover - latest!" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { className: "flex flex-col gap-6", children: bookmarks.map((book, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      PreviewBookItem,
      {
        book,
        usersBookmarks: bookmarks,
        userId: String(userId)
      },
      `${book.id}-${index}`
    )) })
  ] }) });
}
function ErrorBoundary2({ error }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { children: "Oh no!" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("pre", { children: error.message }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: "There was an error in the Bookmarks route!" })
  ] });
}

// app/routes/__home/book/$id.tsx
var id_exports = {};
__export(id_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  default: () => Book,
  loader: () => loader4
});
var import_node6 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), import_tiny_invariant3 = __toESM(require("tiny-invariant")), import_date_fns = require("date-fns");

// app/components/Notification.tsx
var React5 = __toESM(require("react")), import_react12 = require("@headlessui/react"), import_outline4 = require("@heroicons/react/24/outline");

// app/components/icons/XMark.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function XMark({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "h-6 w-6",
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M6 18L18 6M6 6l12 12"
        }
      )
    }
  );
}

// app/components/Notification.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function Notification({ status, classNames: classNames2 }) {
  var _a, _b, _c;
  let [show, setShow] = React5.useState(!1);
  return React5.useEffect(() => {
    setShow(!0);
    let timer = setTimeout(() => {
      setShow(!1);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []), !show || !status ? null : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      "aria-live": "assertive",
      className: `pointer-events-none fixed bottom-0 flex items-center px-4 py-6 sm:p-6 ${classNames2}`,
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex w-96 flex-col items-center space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        import_react12.Transition,
        {
          show,
          as: React5.Fragment,
          enter: "transform ease-out duration-300 transition",
          enterFrom: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
          enterTo: "translate-y-0 opacity-100 sm:translate-x-0",
          leave: "transition ease-in duration-100",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "p-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-start", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex-shrink-0", children: (_a = status == null ? void 0 : status.data) != null && _a.error ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_outline4.ExclamationCircleIcon,
              {
                className: "h-6 w-6 text-red-800",
                "aria-hidden": "true"
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_outline4.CheckCircleIcon,
              {
                className: "h-6 w-6 text-green-400",
                "aria-hidden": "true"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "ml-3 w-0 flex-1 pt-0.5", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: ((_b = status == null ? void 0 : status.data) == null ? void 0 : _b.message) || ((_c = status == null ? void 0 : status.data) == null ? void 0 : _c.errorMessage) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "ml-4 flex flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "button",
              {
                type: "button",
                className: "inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                onClick: () => setShow(!1),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "sr-only", children: "Close" }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(XMark, { className: "h-5 w-5", "aria-hidden": "true" })
                ]
              }
            ) })
          ] }) }) })
        }
      ) })
    }
  );
}

// app/routes/__home/book/$id.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
async function loader4({ request, params }) {
  let { session } = await getSession(request);
  if (!session)
    return (0, import_node6.redirect)(FAILURE_REDIRECT);
  let { id: userId } = session == null ? void 0 : session.user, { id: bookId } = params;
  (0, import_tiny_invariant3.default)(bookId, "bookId is required"), (0, import_tiny_invariant3.default)(userId, "userId is required");
  let data = await fetchBookInfo(bookId), userBookmark = (await getUsersBookmarks(userId)).find((bookmark) => bookmark.id === bookId), buid = userBookmark == null ? void 0 : userBookmark.buid, isBookmarked = (userBookmark == null ? void 0 : userBookmark.bookmarked) ?? !1, isReading = (userBookmark == null ? void 0 : userBookmark.reading) ?? !1, isRead = (userBookmark == null ? void 0 : userBookmark.read) ?? !1;
  return (0, import_node6.json)({
    ...data,
    buid,
    bookId,
    isBookmarked,
    isReading,
    isRead,
    userId
  });
}
function Book() {
  var _a;
  let {
    description,
    image,
    link,
    title,
    authors,
    publisher,
    publishedDate,
    printedPageCount,
    eBook,
    price,
    categories,
    buid,
    bookId,
    isBookmarked,
    isReading,
    isRead,
    userId
  } = (0, import_react13.useLoaderData)(), orderByFirstUpdate = [...(0, import_react13.useFetchers)() || []].reverse(), status = orderByFirstUpdate == null ? void 0 : orderByFirstUpdate[0];
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col gap-16 px-5 md:flex-row-reverse xl:px-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("article", { className: "relative basis-3/5 pb-20 xl:pt-20", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          BookItemFooter,
          {
            buid,
            bookId,
            userId,
            isBookmarked,
            isReading,
            isRead,
            showReadMore: !1,
            classNames: "flex-0 w-[340px] justify-start"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "my-10 text-2xl font-extrabold md:text-4xl xl:text-7xl", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            className: "mt-10 text-lg lg:text-lg [&_b]:text-2xl [&_li]:ml-6 [&_p]:mt-5 [&_p]:text-2xl lg:[&_p]:text-2xl",
            dangerouslySetInnerHTML: { __html: description }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mt-14 hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "a",
          {
            href: link,
            target: "_blank",
            className: "bg-rosyWorm hover:bg-rosyWorm-900 rounded-lg px-10 py-5 text-white",
            rel: "noreferrer",
            children: "View more information"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "basis-2/5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full rounded-md border-[1em] border-white drop-shadow-2xl lg:border-[2em] xl:border-[7em]"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mx-auto mt-10 w-3/4 space-y-6 pb-16", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h3", { className: "font-semibold text-gray-900", children: "Information" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dl", { className: "mt-2 divide-y divide-gray-200 border-b border-t border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Author(s)" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "break-all pl-2 text-gray-900", children: authors == null ? void 0 : authors.join(", ") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Publisher" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "whitespace-nowrap text-gray-900", children: publisher })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Published:" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "whitespace-nowrap text-gray-900", children: (0, import_date_fns.format)(new Date(publishedDate || ""), "do MMM, yyyy") })
            ] }),
            categories != null && categories.length ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium md:block xl:flex", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Categories:" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "break-words text-gray-900 xl:pl-2", children: categories == null ? void 0 : categories[0] })
            ] }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Pages" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "whitespace-nowrap text-gray-900", children: printedPageCount })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Available as eBook?" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "whitespace-nowrap text-gray-900", children: eBook ? "Yes" : "No" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between py-3 text-sm font-medium", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-gray-500", children: "Price" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dd", { className: "whitespace-nowrap text-gray-900", children: [
                "\xA3",
                price
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "block text-center md:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "a",
          {
            href: link,
            target: "_blank",
            className: "bg-rosyWorm hover:bg-rosyWorm-900 rounded-lg px-10 py-5 text-white",
            rel: "noreferrer",
            children: "View more information"
          }
        ) })
      ] })
    ] }),
    status && (status == null ? void 0 : status.data) === "done" && ((_a = status == null ? void 0 : status.data) != null && _a.message) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      Notification,
      {
        status,
        classNames: "mx-auto w-full max-w-[400px] left-1/2 -translate-x-1/2"
      }
    ) : null
  ] });
}
function ErrorBoundary3() {
  let error = (0, import_react13.useRouteError)();
  return (0, import_react13.isRouteErrorResponse)(error) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { children: "Oops" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { children: [
      "Status: ",
      error.status
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: error.data.message })
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { children: "Uh oh ..." }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "Something went wrong." })
  ] });
}

// app/routes/__home/home.tsx
var home_exports2 = {};
__export(home_exports2, {
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action2,
  default: () => DashboardHome,
  loader: () => loader5
});
var import_node7 = require("@remix-run/node"), import_react16 = require("@remix-run/react");

// app/utils/user.ts
var import_react14 = require("@remix-run/react"), import_react15 = require("react");
function useMatchesData(id) {
  let matchingRoutes = (0, import_react14.useMatches)(), route = (0, import_react15.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.email == "string";
}
function useUser() {
  var _a, _b;
  let data = useMatchesData("root");
  if (!((_a = data == null ? void 0 : data.session) != null && _a.user) || !isUser((_b = data == null ? void 0 : data.session) == null ? void 0 : _b.user))
    return {};
  let { id, email, user_metadata } = data.session.user;
  return { id, email, user_metadata };
}

// app/components/Discover.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function Discover({ books, usersBookmarks }) {
  let { id: userId } = useUser();
  return books.length ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "flex flex-col gap-6", "data-testid": "data", children: books == null ? void 0 : books.map((book) => !book.title || !book.image ? null : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    PreviewBookItem,
    {
      book,
      usersBookmarks,
      userId: String(userId)
    },
    book.id
  )) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: "No books found" });
}

// app/routes/__home/home.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
async function action2({ request }) {
  var _a, _b, _c;
  let formData = await request.formData(), userId = ((_a = formData.get("user_id")) == null ? void 0 : _a.toString()) ?? "", bookId = ((_b = formData.get("book_id")) == null ? void 0 : _b.toString()) ?? "", buid = ((_c = formData.get("buid")) == null ? void 0 : _c.toString()) ?? "", action5 = formData.get("_action"), isAddingBookmark = action5 === "create", isRemovingBookmark = action5 === "remove-bookmark", isReading = action5 === "reading", isNotReading = action5 === "remove-reading", isRead = action5 === "read", isNotRead = action5 === "remove-read", addingBookmarkError = "Error adding bookmark. Please retry", removingBookmarkError = "Error removing bookmark. Please retry.", isReadingError = "Error marking book as reading. Please retry", isNotReadingError = "Error marking book as not reading. Please retry", isReadError = "Error marking book as read. Please retry.", isNotReadError = "Error marking book as not finished. Please retry", errorMessage = "", successMessage = "", errors = { error: !0, action: action5 };
  try {
    return isAddingBookmark && (errorMessage = addingBookmarkError, successMessage = "Successfully added to your bookmarks!", await createBookmark(buid, bookId, userId)), isRemovingBookmark && (errorMessage = removingBookmarkError, successMessage = "Successfully removed from your bookmarks!", await removeBookmark(buid)), isReading && (errorMessage = isReadingError, successMessage = "Successfully marked as reading!", await markAsReading(buid, bookId, userId)), isNotReading && (errorMessage = isNotReadingError, successMessage = "Successfully marked as not reading!", await markAsNotReading(buid)), isRead && (errorMessage = isReadError, successMessage = "Successfully marked as read!", await markAsRead(buid, bookId, userId)), isNotRead && (errorMessage = isNotReadError, successMessage = "Successfully marked as not finished!", await markAsNotRead(buid)), (0, import_node7.json)({ status: 200, message: successMessage, id: buid || bookId });
  } catch {
    return {
      ...errors,
      errorMessage
    };
  }
}
async function loader5({ request }) {
  let { session } = await getSession(request);
  if (!(session != null && session.user))
    return (0, import_node7.redirect)(FAILURE_REDIRECT);
  let { id } = session == null ? void 0 : session.user, data = await getLatestBooks(id, 10);
  if (!data || !(data != null && data.books) || !(data != null && data.books.length))
    throw new Response("Problem fetching book list...", {
      status: 403
    });
  return (0, import_node7.json)(data);
}
function DashboardHome() {
  let { books, usersBookmarks } = (0, import_react16.useLoaderData)(), orderByFirstUpdate = [...(0, import_react16.useFetchers)() || []].reverse(), status = orderByFirstUpdate == null ? void 0 : orderByFirstUpdate[0];
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { className: "font-monty sr-only text-xl", children: "Discover - latest!" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Discover, { books, usersBookmarks }),
    status && (status != null && status.data) ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Notification, { status }) : null
  ] });
}
function ErrorBoundary4() {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(import_jsx_runtime16.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { children: "Oh no!" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { children: "There was an error in the Discover route!" })
  ] });
}

// app/routes/__home/read.tsx
var read_exports = {};
__export(read_exports, {
  default: () => Reading,
  loader: () => loader6
});
var import_node8 = require("@remix-run/node"), import_node9 = require("@remix-run/node");
var import_react17 = require("@remix-run/react");
var import_jsx_runtime17 = require("react/jsx-runtime");
async function loader6({ request }) {
  let { session } = await getSession(request);
  if (!session)
    return (0, import_node8.redirect)(FAILURE_REDIRECT);
  let userId = session.user.id, { bookmarks } = await getAllRead(userId);
  return (0, import_node9.json)({ userId, bookmarks });
}
function Reading() {
  let { userId, bookmarks } = (0, import_react17.useLoaderData)(), allBooks = bookmarks.filter((book) => book.read || book.reading);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "md:p-sectionMedium", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ul", { className: "relative my-3 mb-20 flex flex-wrap gap-6", children: allBooks.map((book, index) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    PreviewBookItem,
    {
      book,
      usersBookmarks: bookmarks,
      userId: String(userId)
    },
    `${book.id}-${index}`
  )) }) });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3
});
var import_node10 = require("@remix-run/node");
var action3 = async ({ request }) => {
  let { response } = await closeSession(request);
  return (0, import_node10.redirect)(FAILURE_REDIRECT, { headers: response.headers });
};

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Welcome,
  loader: () => loader7
});
var import_node11 = require("@remix-run/node");

// app/components/Marketing/Container.tsx
var import_clsx = __toESM(require("clsx")), import_jsx_runtime18 = require("react/jsx-runtime");
function Container({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: (0, import_clsx.default)("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className), children });
}

// app/components/Marketing/Faq.tsx
var import_jsx_runtime19 = require("react/jsx-runtime"), faqs = [
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Absolutely, we are happy to take your money in all forms."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam"
    }
  ],
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam"
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam."
    }
  ],
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam."
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam"
    }
  ]
];
function Faqs() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "section",
    {
      id: "faq",
      "aria-labelledby": "faq-title",
      className: "relative overflow-hidden bg-slate-50 py-20 sm:py-32",
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Container, { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "mx-auto max-w-2xl lg:mx-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            "h2",
            {
              id: "faq-title",
              className: "font-display text-3xl tracking-tight text-slate-900 sm:text-4xl",
              children: "Frequently asked questions"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "mt-4 text-lg tracking-tight text-slate-700", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam dolor aspernatur officiis accusantium, commodi, minus debitis mollitia necessitatibus cumque quam quisquam sint, non explicabo a? Veniam ea reiciendis minus." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("ul", { className: "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3", children: faqs.map((column, columnIndex) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("ul", { className: "flex flex-col gap-y-8", children: column.map((faq, faqIndex) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { className: "font-display text-lg leading-7 text-slate-900", children: faq.question }),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "mt-4 text-sm text-slate-700", children: faq.answer })
        ] }, faqIndex)) }) }, columnIndex)) })
      ] })
    }
  );
}

// app/components/Logo.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function Logo({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "svg",
    {
      viewBox: "0 0 131 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M78.7835 14.4173C79.7896 14.7752 80.2926 15.2524 80.2926 15.849C80.2926 16.0429 80.2025 16.4083 80.0223 16.9452L75.6977 29.3608C75.6677 29.4652 75.6151 29.592 75.5401 29.7411C75.465 29.8903 75.2623 30.0916 74.9319 30.3451C74.6166 30.5837 74.2337 30.7031 73.7832 30.7031C73.3477 30.7031 72.9648 30.5837 72.6345 30.3451C72.3191 30.0916 72.1089 29.8455 72.0038 29.6069L69.3685 21.889C67.7018 26.7807 66.8534 29.2713 66.8233 29.3608C66.7933 29.4503 66.7257 29.5771 66.6206 29.7411C66.5155 29.9052 66.3954 30.0543 66.2602 30.1885C65.9149 30.5315 65.5019 30.7031 65.0214 30.7031C64.5409 30.7031 64.143 30.5912 63.8276 30.3675C63.5273 30.1438 63.3246 29.9201 63.2195 29.6964L63.0618 29.3608L58.7147 16.9452C58.5496 16.453 58.467 16.0876 58.467 15.849C58.467 15.2524 58.97 14.7827 59.9761 14.4397C60.4115 14.2905 60.8019 14.2159 61.1473 14.2159C61.5077 14.2159 61.778 14.3353 61.9582 14.5739C62.1534 14.8125 62.3261 15.1779 62.4762 15.67L64.9538 23.1418L67.4089 15.7819C67.6192 15.1555 68.0021 14.723 68.5577 14.4844C68.7979 14.38 69.1057 14.3278 69.4811 14.3278C69.8716 14.3278 70.2319 14.4546 70.5623 14.7081C70.8926 14.9467 71.1029 15.1853 71.193 15.424L73.7832 23.1865L76.2608 15.67C76.381 15.327 76.4786 15.0735 76.5536 14.9094C76.6287 14.7454 76.7639 14.5888 76.9591 14.4397C77.1693 14.2756 77.4246 14.1936 77.7249 14.1936C78.0252 14.1936 78.3781 14.2681 78.7835 14.4173Z",
            fill: "#333333"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M89.2802 14.1265C91.5025 14.1265 93.4321 14.9243 95.0688 16.5201C96.7055 18.1159 97.5239 20.0994 97.5239 22.4707C97.5239 24.827 96.7431 26.8404 95.1814 28.5107C93.6198 30.1662 91.6977 30.9939 89.4153 30.9939C87.1329 30.9939 85.1883 30.1736 83.5816 28.5331C81.9899 26.8926 81.1941 24.9389 81.1941 22.672C81.1941 21.4342 81.4193 20.2784 81.8698 19.2046C82.3203 18.1159 82.9209 17.2061 83.6717 16.4754C84.4225 15.7446 85.2859 15.1704 86.262 14.7528C87.238 14.3353 88.2441 14.1265 89.2802 14.1265ZM85.1808 22.5602C85.1808 23.8875 85.6088 24.9687 86.4647 25.8039C87.3356 26.6242 88.3041 27.0343 89.3703 27.0343C90.4364 27.0343 91.3974 26.6316 92.2533 25.8263C93.1092 25.0209 93.5372 23.9397 93.5372 22.5825C93.5372 21.2254 93.1017 20.1367 92.2308 19.3164C91.3749 18.4962 90.4139 18.0861 89.3477 18.0861C88.2816 18.0861 87.3206 18.5036 86.4647 19.3388C85.6088 20.1591 85.1808 21.2328 85.1808 22.5602Z",
            fill: "#333333"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M111.633 27.9515C111.858 28.4884 111.97 28.8761 111.97 29.1147C111.97 29.6815 111.505 30.1587 110.574 30.5465C110.094 30.7552 109.703 30.8596 109.403 30.8596C109.117 30.8596 108.877 30.7925 108.682 30.6583C108.502 30.5092 108.367 30.36 108.277 30.2109C108.126 29.9275 107.541 28.5778 106.52 26.1618L105.821 26.2066H102.983V28.7344C102.983 29.0775 102.968 29.3384 102.938 29.5174C102.923 29.6815 102.856 29.8753 102.736 30.099C102.525 30.5017 101.94 30.7031 100.979 30.7031C99.9277 30.7031 99.3121 30.4271 99.1319 29.8753C99.0418 29.6218 98.9967 29.2341 98.9967 28.7121V16.2964C98.9967 15.9534 99.0042 15.6999 99.0193 15.5358C99.0493 15.3568 99.1244 15.1555 99.2445 14.9318C99.4547 14.5291 100.04 14.3278 101.001 14.3278H105.867C107.188 14.3278 108.472 14.805 109.718 15.7595C110.319 16.2218 110.814 16.8482 111.205 17.6386C111.595 18.4291 111.79 19.309 111.79 20.2784C111.79 21.9636 111.227 23.3506 110.101 24.4393C110.431 25.2297 110.942 26.4004 111.633 27.9515ZM102.983 22.247H105.867C106.302 22.247 106.737 22.0829 107.173 21.7548C107.608 21.4267 107.826 20.9346 107.826 20.2784C107.826 19.6222 107.608 19.13 107.173 18.8019C106.737 18.4589 106.287 18.2874 105.821 18.2874H102.983V22.247Z",
            fill: "#333333"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M130.752 14.9542C130.872 15.1779 130.94 15.3792 130.955 15.5582C130.985 15.7371 131 15.9981 131 16.3412V28.7568C131 29.7859 130.715 30.3899 130.144 30.5688C129.859 30.6583 129.498 30.7031 129.063 30.7031C128.627 30.7031 128.282 30.6658 128.027 30.5912C127.772 30.5166 127.576 30.4271 127.441 30.3228C127.306 30.2184 127.201 30.0692 127.126 29.8753C127.051 29.6218 127.013 29.2341 127.013 28.7121V21.2179C126.638 21.6803 126.09 22.4185 125.369 23.4326C124.648 24.4318 124.19 25.0582 123.995 25.3117C123.8 25.5653 123.665 25.7442 123.59 25.8486C123.515 25.9381 123.327 26.0723 123.027 26.2513C122.741 26.4154 122.426 26.4974 122.081 26.4974C121.75 26.4974 121.442 26.4228 121.157 26.2737C120.887 26.1096 120.692 25.953 120.571 25.8039L120.391 25.5578C120.091 25.185 119.498 24.3946 118.612 23.1865C117.726 21.9636 117.245 21.3074 117.17 21.2179V28.7568C117.17 29.0998 117.155 29.3608 117.125 29.5398C117.11 29.7038 117.043 29.8903 116.923 30.099C116.697 30.5017 116.112 30.7031 115.166 30.7031C114.25 30.7031 113.679 30.5017 113.454 30.099C113.334 29.8903 113.259 29.6964 113.229 29.5174C113.214 29.3384 113.206 29.07 113.206 28.7121V16.2964C113.206 15.9534 113.214 15.6999 113.229 15.5358C113.259 15.3568 113.334 15.1555 113.454 14.9318C113.679 14.544 114.265 14.3502 115.211 14.3502C115.616 14.3502 115.962 14.4024 116.247 14.5068C116.547 14.5962 116.742 14.6932 116.832 14.7976L116.968 14.9318L122.081 21.5982C124.633 18.2426 126.338 16.028 127.193 14.9542C127.449 14.5515 128.049 14.3502 128.995 14.3502C129.956 14.3502 130.542 14.5515 130.752 14.9542Z",
            fill: "#333333"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M26.619 17.4003C28.5868 19.7704 29.5548 22.4151 29.5231 25.3342C29.419 28.6889 28.2229 31.4949 25.9346 33.7524C23.6804 35.9766 20.9486 37.0715 17.7392 37.0371L4.41143 36.8943C2.04656 36.8689 0.668347 36.2166 0.276791 34.9372C0.0802846 34.3646 -0.0115904 33.4911 0.00116651 32.3167L0.304599 4.38311C0.313347 3.57782 0.336617 2.99081 0.37441 2.62207C0.445987 2.25371 0.619645 1.81932 0.895383 1.3189C1.3782 0.418017 2.70069 -0.0208429 4.86285 0.00232529L17.6331 0.139162C20.7413 0.172467 23.331 1.27407 25.4022 3.44396C27.5745 5.64849 28.644 8.27746 28.6109 11.3309C28.5868 13.5454 27.9229 15.5686 26.619 17.4003ZM20.5589 24.7348C20.5677 23.9295 20.4732 23.2909 20.2756 22.819C20.1118 22.3474 19.8114 22.0086 19.3744 21.8026C18.7016 21.5269 17.7572 21.3826 16.5409 21.3695C15.3247 21.3565 14.4151 21.1119 13.8121 20.6356C13.2091 20.1593 12.9154 19.1998 12.9311 17.757C12.9471 16.2806 13.2618 15.3108 13.875 14.8475C14.522 14.3847 15.5718 14.161 17.0245 14.1766C18.3759 14.1911 19.1905 13.8474 19.4684 13.1457C19.5738 12.7777 19.631 12.1743 19.6402 11.3354C19.6493 10.4966 19.3685 9.9063 18.7978 9.5646C18.2609 9.22327 17.435 9.04663 16.3202 9.03469L9.22555 8.95867L9.01834 28.0341L17.3292 28.1231C19.4576 28.1459 20.5341 27.0165 20.5589 24.7348Z",
            fill: "#333333"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "path",
          {
            d: "M48.8259 18.8966C53.9412 23.8844 57.5665 27.6314 59.7017 30.1376C60.8031 31.391 61.349 32.4539 61.3396 33.3263C61.3305 34.1652 60.6438 35.1646 59.2797 36.3245C57.916 37.4508 56.7949 38.0093 55.9165 37.9999C55.0719 37.9908 54.0492 37.2752 52.8483 35.8529L41.8368 23.1004L41.7302 32.9149C41.7215 33.7202 41.6813 34.307 41.6097 34.6754C41.5719 35.0441 41.4152 35.4787 41.1394 35.9791C40.6566 36.88 39.3341 37.3188 37.172 37.2957C34.8071 37.2703 33.4289 36.618 33.0373 35.3386C32.8405 34.7995 32.7484 33.9428 32.7612 32.7684L33.0651 4.78449C33.0735 4.01275 33.0966 3.44251 33.1344 3.07378C33.2063 2.67186 33.3802 2.22069 33.6559 1.72028C34.1387 0.819391 35.4612 0.380531 37.6234 0.403699C39.9883 0.42904 41.3836 1.06481 41.8093 2.31101C41.972 2.88324 42.047 3.75654 42.0342 4.93093L41.9298 14.5441C46.5802 9.45961 50.3421 5.28841 53.2157 2.03054C54.4131 0.667499 55.4509 -0.00931526 56.3293 9.6819e-05C57.2077 0.00950891 58.3162 0.608649 59.6548 1.79752C60.9937 2.95283 61.6585 3.96668 61.649 4.83909C61.6399 5.67793 61.1222 6.67912 60.0959 7.84265C58.112 10.0698 55.038 13.1241 50.8737 17.0058L48.8259 18.8966Z",
            fill: "#333333"
          }
        )
      ]
    }
  );
}

// app/components/Marketing/Footer.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("footer", { className: "bg-slate-50", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Container, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "py-16", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Logo, { className: "mx-auto h-10 w-auto" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex gap-x-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "a",
          {
            href: "https://twitter.com/danielvanc",
            className: "group",
            "aria-label": "Follow the creator on Twitter",
            target: "_blank",
            rel: "noreferrer",
            children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
              "svg",
              {
                "aria-hidden": "true",
                className: "h-6 w-6 fill-slate-500 group-hover:fill-slate-700",
                children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" })
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "a",
          {
            href: "https://github.com/danielvanc/bookworm",
            className: "group",
            "aria-label": "Contribute to the project on GitHub",
            target: "_blank",
            rel: "noreferrer",
            children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
              "svg",
              {
                "aria-hidden": "true",
                className: "h-6 w-6 fill-slate-500 group-hover:fill-slate-700",
                children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" })
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("p", { className: "mt-6 text-sm text-slate-500 sm:mt-0", children: [
        "Copyright \xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Bookworm. All rights reserved."
      ] })
    ] })
  ] }) });
}

// app/components/Marketing/Header.tsx
var import_react18 = require("react"), import_react19 = require("@headlessui/react"), import_clsx2 = __toESM(require("clsx"));
var import_react20 = require("@remix-run/react"), import_jsx_runtime22 = (
  // @ts-ignore
  require("react/jsx-runtime")
);
function MobileNavLink({ href, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react19.Popover.Button, { as: import_react20.Link, href, className: "block w-full p-2", children });
}
function MobileNavIcon({ open }) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "svg",
    {
      "aria-hidden": "true",
      className: "h-3.5 w-3.5 overflow-visible stroke-slate-700",
      fill: "none",
      strokeWidth: 2,
      strokeLinecap: "round",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "path",
          {
            d: "M0 1H14M0 7H14M0 13H14",
            className: (0, import_clsx2.default)(
              "origin-center transition",
              open && "scale-90 opacity-0"
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "path",
          {
            d: "M2 2L12 12M12 2L2 12",
            className: (0, import_clsx2.default)(
              "origin-center transition",
              !open && "scale-90 opacity-0"
            )
          }
        )
      ]
    }
  );
}
function MobileNavigation() {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_react19.Popover, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      import_react19.Popover.Button,
      {
        className: "relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none",
        "aria-label": "Toggle Navigation",
        children: ({ open }) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavIcon, { open })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_react19.Transition.Root, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        import_react19.Transition.Child,
        {
          as: import_react18.Fragment,
          enter: "duration-150 ease-out",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "duration-150 ease-in",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react19.Popover.Overlay, { className: "fixed inset-0 bg-slate-300/50" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        import_react19.Transition.Child,
        {
          as: import_react18.Fragment,
          enter: "duration-150 ease-out",
          enterFrom: "opacity-0 scale-95",
          enterTo: "opacity-100 scale-100",
          leave: "duration-100 ease-in",
          leaveFrom: "opacity-100 scale-100",
          leaveTo: "opacity-0 scale-95",
          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
            import_react19.Popover.Panel,
            {
              as: "div",
              className: "absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavLink, { href: "#features", children: "Features" }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavLink, { href: "#testimonials", children: "Testimonials" }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavLink, { href: "#pricing", children: "Pricing" }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("hr", { className: "m-2 border-slate-300/40" }),
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavLink, { href: "/login", children: "Sign in" })
              ]
            }
          )
        }
      )
    ] })
  ] });
}
function Header2() {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("header", { className: "bg-[#36003C] py-10 text-white", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("nav", { className: "relative z-50 flex justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flex items-center md:gap-x-12", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react20.Link, { to: "#", "aria-label": "Home", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      "img",
      {
        src: "/images/logo_header.svg",
        alt: "",
        className: "mx-auto h-10 w-auto"
      }
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center gap-x-5 md:gap-x-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react20.NavLink, { to: "/login", children: "Sign in" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "-mr-1 md:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(MobileNavigation, {}) })
    ] })
  ] }) }) });
}

// app/components/Marketing/SampleFeatures.tsx
var React6 = __toESM(require("react")), import_react21 = require("@headlessui/react"), import_clsx3 = __toESM(require("clsx"));
var import_jsx_runtime23 = require("react/jsx-runtime"), features = [
  {
    title: "Discover",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam. Mollitia necessitatibus cumque quam quisquam sint, non explicabo a.",
    image: "/images/sample.jpg"
  },
  {
    title: "Bookmark",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam. Mollitia necessitatibus cumque quam quisquam sint, non explicabo a.",
    image: "/images/sample.jpg"
  },
  {
    title: "Show what you've read",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam. Mollitia necessitatibus cumque quam quisquam sint, non explicabo a.",
    image: "/images/sample.jpg"
  },
  {
    title: "Profile",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam. Mollitia necessitatibus cumque quam quisquam sint, non explicabo a.",
    image: "/images/sample.jpg"
  }
];
function SampleFeatures() {
  let [tabOrientation, setTabOrientation] = React6.useState("horizontal");
  return React6.useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");
    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }
    return onMediaQueryChange(lgMediaQuery), lgMediaQuery.addEventListener("change", onMediaQueryChange), () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []), /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    "section",
    {
      id: "features",
      "aria-label": "Features for running your books",
      className: "relative overflow-hidden bg-[#36003C] pt-20 pb-28 sm:py-32",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "img",
          {
            className: "absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]",
            src: "/images/background-features.jpg",
            alt: "",
            width: 2245,
            height: 1636
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Container, { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "max-w-2xl md:mx-auto md:text-center xl:max-w-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h2", { className: "font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl", children: "The app made for book lovers by book lovers." }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "mt-6 text-lg tracking-tight text-blue-100", children: "Find, read and spread your love for books." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_react21.Tab.Group,
            {
              as: "div",
              className: "mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0",
              vertical: tabOrientation === "vertical",
              children: ({ selectedIndex }) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react21.Tab.List, { className: "relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal", children: features.map((feature, featureIndex) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
                  "div",
                  {
                    className: (0, import_clsx3.default)(
                      "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                      selectedIndex === featureIndex ? "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10" : "hover:bg-white/10 lg:hover:bg-white/5"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
                        import_react21.Tab,
                        {
                          className: (0, import_clsx3.default)(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                            selectedIndex === featureIndex ? "text-blue-600 lg:text-white" : "text-blue-100 hover:text-white lg:text-white"
                          ),
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" }),
                            feature.title
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                        "p",
                        {
                          className: (0, import_clsx3.default)(
                            "mt-2 hidden text-sm lg:block",
                            selectedIndex === featureIndex ? "text-white" : "text-blue-100 group-hover:text-white"
                          ),
                          children: feature.description
                        }
                      )
                    ]
                  },
                  feature.title
                )) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react21.Tab.Panels, { className: "lg:col-span-7", children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_react21.Tab.Panel, { unmount: !1, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "relative sm:px-6 lg:hidden", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" }),
                    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "relative mx-auto max-w-2xl text-base text-white sm:text-center", children: feature.description })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                    "img",
                    {
                      className: "w-full",
                      src: feature.image,
                      alt: ""
                    }
                  ) })
                ] }, feature.title)) })
              ] })
            }
          )
        ] })
      ]
    }
  );
}

// app/routes/index.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
async function loader7({ request }) {
  let { session } = await getSession(request);
  return session ? (0, import_node11.redirect)(SUCCESS_REDIRECT) : {};
}
function Welcome() {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Header2, {}),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(SampleFeatures, {}),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Faqs, {}),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Footer, {})
  ] });
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => Login,
  loader: () => loader8
});
var import_node12 = require("@remix-run/node"), import_node13 = require("@remix-run/node"), import_react24 = require("@remix-run/react");

// app/components/AuthenticateForm.tsx
var React7 = __toESM(require("react")), import_fa = require("react-icons/fa"), import_ai = require("react-icons/ai"), import_react22 = require("@remix-run/react"), import_jsx_runtime25 = require("react/jsx-runtime");
function AuthenticateForm({ error }) {
  let { supabase } = (0, import_react22.useOutletContext)(), [redirectTo, setRedirectTo] = React7.useState(null);
  return React7.useEffect(() => {
    var _a;
    window && setRedirectTo(`${(_a = window == null ? void 0 : window.location) == null ? void 0 : _a.origin}/oauth/callback/`);
  }, []), /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "mb-10 rounded-t-md border-t-[1px]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "mb-5 mt-10 pb-3", children: "Or sign in with:" }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { children: [
      (error == null ? void 0 : error.message) && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { children: error.message }),
      redirectTo ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("ul", { className: "social-logins mx-auto flex max-w-[300px] justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "button",
          {
            "aria-label": "Sptofy",
            onClick: () => {
              supabase == null || supabase.auth.signInWithOAuth({
                provider: "Spotify",
                options: { redirectTo }
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_fa.FaSpotify, { className: "text-lg lm:text-xl md:text-2xl" })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "button",
          {
            "aria-label": "Google",
            onClick: () => {
              supabase == null || supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo }
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_ai.AiOutlineGoogle, { className: "text-lg lm:text-xl md:text-2xl" })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "button",
          {
            "aria-label": "Twitter",
            onClick: () => {
              supabase == null || supabase.auth.signInWithOAuth({
                provider: "twitter",
                options: { redirectTo }
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_fa.FaTwitter, { className: "text-lg lm:text-xl md:text-2xl" })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "button",
          {
            "aria-label": "Facebook",
            onClick: () => {
              supabase == null || supabase.auth.signInWithOAuth({
                provider: "facebook",
                options: { redirectTo }
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_fa.FaFacebookF, { className: "text-lg lm:text-xl md:text-2xl" })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          "button",
          {
            "aria-label": "Github",
            onClick: () => {
              supabase == null || supabase.auth.signInWithOAuth({
                provider: "github",
                options: { redirectTo }
              });
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_fa.FaGithub, { className: "text-lg lm:text-xl md:text-2xl" })
          }
        ) })
      ] }) : null
    ] })
  ] });
}

// app/components/AuthLayout.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function AuthLayout({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_jsx_runtime26.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "relative flex min-h-full justify-center md:px-12 lg:px-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0", children }) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "hidden sm:contents lg:relative lg:block lg:flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "img",
      {
        src: "/images/background-auth.jpg",
        alt: "",
        className: "absolute inset-0 h-full w-full object-cover"
      }
    ) })
  ] }) });
}

// app/components/LoginWithEmail.tsx
var import_react23 = require("@remix-run/react");

// app/components/Fields.tsx
var import_clsx4 = __toESM(require("clsx")), import_jsx_runtime27 = require("react/jsx-runtime"), formClasses = "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm";
function Label({ id, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "label",
    {
      htmlFor: id,
      className: "mb-3 block text-sm font-medium text-gray-700",
      children
    }
  );
}
function TextField({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Label, { id, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("input", { id, type, ...props, className: formClasses })
  ] });
}

// app/components/LoginWithEmail.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
function LoginWithEmail() {
  var _a, _b;
  let data = (0, import_react23.useActionData)(), errors = (0, import_react23.useActionData)(), isSubmitting = (0, import_react23.useNavigation)().state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    import_react23.Form,
    {
      method: "post",
      action: "/login",
      className: "mt-10 grid grid-cols-1 gap-y-8",
      children: !(errors != null && errors.email) && data ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("p", { children: "Success! Go ahead and click the link in your email!" }) : /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_jsx_runtime28.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          TextField,
          {
            label: "Email address",
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: !0,
            className: `${(_a = data == null ? void 0 : data.errors) != null && _a.email ? "border-red-300 text-red-900" : ""}`
          }
        ),
        ((_b = data == null ? void 0 : data.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("p", { children: "Please submit a valid email address" }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "group inline-flex w-full items-center justify-center rounded-full bg-rosyWorm py-2 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-slate-600",
            children: [
              isSubmitting ? "Requesting a login link..." : null,
              isSubmitting ? null : /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("span", { children: [
                "Request a login link ",
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { "aria-hidden": "true", children: "\u2192" })
              ] })
            ]
          }
        ) })
      ] })
    }
  );
}

// app/routes/login.tsx
var import_jsx_runtime29 = require("react/jsx-runtime"), action4 = async ({ request }) => {
  let email = (await request.formData()).get("email"), errors = {};
  if ((typeof email != "string" || !email.includes("@")) && (errors.email = "That doesn't look like an email address"), Object.keys(errors).length)
    return (0, import_node13.json)(errors, { status: 422 });
  let { supabaseClient, response } = await createSupabaseClient(request), { data } = await supabaseClient.auth.signInWithOtp({
    email: String(email),
    options: {
      emailRedirectTo: `http://${request.headers.get("host")}/oauth/callback/`
    }
  });
  return (0, import_node13.json)(
    { data },
    {
      headers: response.headers
    }
  );
};
async function loader8({ request }) {
  let { session, error, response } = await getSession(request);
  return session ? (0, import_node12.redirect)(SUCCESS_REDIRECT, { headers: response.headers }) : (0, import_node13.json)(
    { error },
    {
      headers: response.headers
    }
  );
}
function Login() {
  let { error } = (0, import_react24.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_jsx_runtime29.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(AuthLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_react24.Link, { to: "/", "aria-label": "Home", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Logo, { className: "h-10 w-auto" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "mt-20", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h2", { className: "text-lg font-semibold text-gray-900", children: "Sign in to get access" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(LoginWithEmail, {}),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(AuthenticateForm, { error })
  ] }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-YUYWXZ42.js", imports: ["/build/_shared/chunk-34E6I5LM.js", "/build/_shared/chunk-6RE5ADJW.js", "/build/_shared/chunk-25SZ5MWR.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-BONLWM4Z.js", imports: ["/build/_shared/chunk-KINNEDYY.js", "/build/_shared/chunk-KYUWNA5S.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/__home": { id: "routes/__home", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__home-WAWMHIAX.js", imports: ["/build/_shared/chunk-DM5NHE2D.js", "/build/_shared/chunk-EVHANG5Z.js", "/build/_shared/chunk-AUAFYJE2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__home/book/$id": { id: "routes/__home/book/$id", parentId: "routes/__home", path: "book/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/__home/book/$id-M42GIEUF.js", imports: ["/build/_shared/chunk-NWIKZLHL.js", "/build/_shared/chunk-XCPWJEWY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/__home/bookmarks": { id: "routes/__home/bookmarks", parentId: "routes/__home", path: "bookmarks", index: void 0, caseSensitive: void 0, module: "/build/routes/__home/bookmarks-MVVUHS5G.js", imports: ["/build/_shared/chunk-JAPWAI7Y.js", "/build/_shared/chunk-XCPWJEWY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/__home/home": { id: "routes/__home/home", parentId: "routes/__home", path: "home", index: void 0, caseSensitive: void 0, module: "/build/routes/__home/home-PCOG3J4Z.js", imports: ["/build/_shared/chunk-NWIKZLHL.js", "/build/_shared/chunk-JAPWAI7Y.js", "/build/_shared/chunk-XCPWJEWY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/__home/read": { id: "routes/__home/read", parentId: "routes/__home", path: "read", index: void 0, caseSensitive: void 0, module: "/build/routes/__home/read-VY64S5XA.js", imports: ["/build/_shared/chunk-JAPWAI7Y.js", "/build/_shared/chunk-XCPWJEWY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-GSB7SEEX.js", imports: ["/build/_shared/chunk-RJXH7JT6.js", "/build/_shared/chunk-DM5NHE2D.js", "/build/_shared/chunk-AUAFYJE2.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-KETZ6YTE.js", imports: ["/build/_shared/chunk-RJXH7JT6.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-UIVMAB3N.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/oauth.callback": { id: "routes/oauth.callback", parentId: "root", path: "oauth/callback", index: void 0, caseSensitive: void 0, module: "/build/routes/oauth.callback-FJYLUX5B.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, version: "bcdf1d1c", hmr: void 0, url: "/build/manifest-BCDF1D1C.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "./public/build", future = { unstable_dev: !0, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_react_stream_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/oauth.callback": {
    id: "routes/oauth.callback",
    parentId: "root",
    path: "oauth/callback",
    index: void 0,
    caseSensitive: void 0,
    module: oauth_callback_exports
  },
  "routes/__home": {
    id: "routes/__home",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: home_exports
  },
  "routes/__home/bookmarks": {
    id: "routes/__home/bookmarks",
    parentId: "routes/__home",
    path: "bookmarks",
    index: void 0,
    caseSensitive: void 0,
    module: bookmarks_exports
  },
  "routes/__home/book/$id": {
    id: "routes/__home/book/$id",
    parentId: "routes/__home",
    path: "book/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/__home/home": {
    id: "routes/__home/home",
    parentId: "routes/__home",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: home_exports2
  },
  "routes/__home/read": {
    id: "routes/__home/read",
    parentId: "routes/__home",
    path: "read",
    index: void 0,
    caseSensitive: void 0,
    module: read_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
