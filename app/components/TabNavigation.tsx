import { NavLink } from "@remix-run/react";

interface Props {
  tabs: {
    name: string;
    href: string;
    current: boolean;
  }[];
  optimisticPath?: string;
}
const defaultLinkStyles =
  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10";
const defaultSpanStyles = "absolute inset-x-0 bottom-0 h-0.5";
const activeLinkStyles = `text-gray-900 ${defaultLinkStyles}`;
const activeLinkSpanStyles = `bg-rose-500  ${defaultSpanStyles}`;

export default function TabNavigation({ tabs, optimisticPath }: Props) {
  function appendBorders(isActive: boolean, idx: number): string {
    const borderLeftStyle = idx === 0 ? "rounded-l-lg" : "";
    const borderRightStyle = idx === tabs.length - 1 ? "rounded-r-lg" : "";
    const classes = isActive
      ? `${activeLinkStyles}`
      : `text-gray-500 hover:text-gray-700 ${defaultLinkStyles}`;

    return `${classes} ${borderLeftStyle} ${borderRightStyle}`;
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="question-tabs"
          className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className={({ isActive }: { isActive: boolean }) =>
                appendBorders(isActive, tabIdx)
              }
            >
              {({ isActive }) => (
                <>
                  <span>{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={
                      (isActive && !optimisticPath) ||
                      (optimisticPath && optimisticPath === `/${tab.href}`)
                        ? activeLinkSpanStyles
                        : `bg-transparent ${defaultSpanStyles}`
                    }
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
