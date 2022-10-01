import React from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  FireIcon,
  SearchIcon,
  TrendingUpIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon, HomeIcon } from "@heroicons/react/outline";
import { classNames } from "~/utils";
import { Form } from "@remix-run/react";

interface Props {
  name: string;
  email: string;
  avatar: string;
}

const userNavigation = [{ name: "Coming soon..", href: "#" }];

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Popular", href: "#", icon: FireIcon, current: false },
  { name: "Communities", href: "#", icon: UserGroupIcon, current: false },
  { name: "Trending", href: "#", icon: TrendingUpIcon, current: false },
];

/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */
export default function Header({ name, email, avatar }: Props) {
  return (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? "fixed inset-0 z-40 overflow-y-auto" : "bg-rosyWorm",
          " shadow-sm lg:static lg:overflow-y-visible"
        )
      }
    >
      {({ open }) => (
        <>
          <div
            className={`${
              open ? "bg-rosyWorm" : ""
            } mx-auto max-w-screen-desktopMax px-4 sm:px-6 lg:px-8`}
          >
            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
              <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      src="/images/logo_header.svg"
                      alt="BKWorm - Book app for book lovers!"
                      className="block h-8 w-auto"
                    />
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-7">
                <div className="flex items-center px-6 py-10 md:mx-auto md:max-w-xl lg:mx-0 lg:max-w-none xl:px-0">
                  <div className="hidden w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-rose-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3">
                {/* <a
                  href="http"
                  className="ml-5 flex-shrink-0 rounded-full bg-rosyWorm p-1 text-pink-400 hover:bg-pink-800 focus:outline-none focus:outline-blue-400 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </a> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-5 flex-shrink-0">
                  <div>
                    <Menu.Button className="ring-offset- to-blue-400focus:outline-none focus:white flex rounded-full bg-rosyWorm  ring-2 ring-pink-400 focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full p-1"
                        src={avatar}
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block py-2 px-4 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Form method="post">
                  <button className="ml-6 inline-flex items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">
                    Logout
                  </button>
                </Form>
              </div>
            </div>
          </div>

          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "hover:bg-gray-50",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
              <a
                href="http"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700"
              >
                New Post
              </a>

              {/* <div className="mt-6 flex justify-center">
                <a
                  href="http"
                  className="text-base font-medium text-white hover:underline"
                >
                  Go Premium
                </a>
              </div> */}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
