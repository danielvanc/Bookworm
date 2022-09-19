import * as React from "react";
import { classNames } from "~/utils";

import { HomeIcon } from "@heroicons/react/outline";
import TabNavigation from "./TabNavigation";
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

  const tabs = [
    { name: "Discover", href: "home", current: true },
    { name: "Bookmarked", href: "bookmarks", current: false },
    { name: "Read / Reading", href: "read", current: false },
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
          <main className="lg:col-span-9 xl:col-span-7">
            <TabNavigation tabs={tabs} />
            <div className="mt-4">
              {children}
              {/* <ul role="list" className="space-y-4">
                {questions.map((question) => (
                  <li
                    key={question.id}
                    className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                  >
                    <article aria-labelledby={"question-title-" + question.id}>
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={question.author.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a
                                href={question.author.href}
                                className="hover:underline"
                              >
                                {question.author.name}
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a
                                href={question.href}
                                className="hover:underline"
                              >
                                <time dateTime={question.datetime}>
                                  {question.date}
                                </time>
                              </a>
                            </p>
                          </div>
                          <div className="flex flex-shrink-0 self-center">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                  <span className="sr-only">Open options</span>
                                  <DotsVerticalIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>

                              <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="http"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "flex px-4 py-2 text-sm"
                                          )}
                                        >
                                          <StarIcon
                                            className="mr-3 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span>Add to favorites</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="http"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "flex px-4 py-2 text-sm"
                                          )}
                                        >
                                          <CodeIcon
                                            className="mr-3 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span>Embed</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="http"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "flex px-4 py-2 text-sm"
                                          )}
                                        >
                                          <FlagIcon
                                            className="mr-3 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <span>Report content</span>
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                        <h2
                          id={"question-title-" + question.id}
                          className="mt-4 text-base font-medium text-gray-900"
                        >
                          {question.title}
                        </h2>
                      </div>
                      <div
                        className="mt-2 space-y-4 text-sm text-gray-700"
                        dangerouslySetInnerHTML={{ __html: question.body }}
                      />
                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex space-x-6">
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <ThumbUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                {question.likes}
                              </span>
                              <span className="sr-only">likes</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <ChatAltIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                {question.replies}
                              </span>
                              <span className="sr-only">replies</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <EyeIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="font-medium text-gray-900">
                                {question.views}
                              </span>
                              <span className="sr-only">views</span>
                            </button>
                          </span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <ShareIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              <span className="font-medium text-gray-900">
                                Share
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
