import * as React from "react";
import { classNames } from "~/utils";

import { HomeIcon } from "@heroicons/react/outline";
import Header from "./Header";

export default function Dashboard({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const userData = user.user_metadata || {};
  const name = userData.full_name.split(" ")[0];
  const email = userData.email;
  const avatar = userData.avatar_url || "";

  const navigation = [
    { name: "Home", href: "/home", icon: HomeIcon, current: true },
  ];

  return (
    <div className="min-h-full">
      <Header name={name} email={email} avatar={avatar} />

      <div className="py-10">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-screen-desktopMax lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="space-y-1 pb-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
