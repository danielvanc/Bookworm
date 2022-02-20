import { useAuth } from "~/contexts/auth";

export default function Unauthenticated() {
  const { login } = useAuth();

  return (
    <div className="unauthed-wrapper">
      <div className="col-start-2 col-end-5 row-start-1 row-span-1 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 xl:self-end">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="unauthed-header relative">
        <div className="col-start-1 col-end-6 row-start-1 row-span-full lm:col-span-full  xl:col-start-1 xl:col-end-7 xl:self-end xl:mb-10 ">
          <h1 className="main-heading">Read more</h1>
          <h2 className="sub-heading">
            Find read and spread your love for books
          </h2>
        </div>
        <p className="font-fred text-grayWorm-300 text-sm lm:text-xl col-start-2 col-end-6 row-start-1 row-end-2 self-end lm:row-start-3 lm:row-end-4 lm:col-start-2 lm:col-end-12 lm:self-start xl:col-start-4 xl:col-end-5 xl:row-start-2 xl:row-end-3">
          Let your mind escape
        </p>
      </header>

      <main className="row-start-4 row-span-1 col-start-2 col-end-6 lm:col-end-9 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 xl:mr-10">
        <p className="text-3xl xl:my-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <div className="border-2 rounded-lg p-5 xl:mr-10 xl:mb-10">
          <h2>Sign in</h2>
          <ul className="flex justify-between">
            <li>
              <button onClick={login}>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-github"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </button>
            </li>
            <li>
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#1da1f2" height="512" rx="15%" width="512" />
                <path
                  d="m437 152a72 72 0 0 1 -40 12 72 72 0 0 0 32-40 72 72 0 0 1 -45 17 72 72 0 0 0 -122 65 200 200 0 0 1 -145-74 72 72 0 0 0 22 94 72 72 0 0 1 -32-7 72 72 0 0 0 56 69 72 72 0 0 1 -32 1 72 72 0 0 0 67 50 200 200 0 0 1 -105 29 200 200 0 0 0 309-179 200 200 0 0 0 35-37"
                  fill="#fff"
                />
              </svg>
            </li>
            <li>
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#1877f2" height="512" rx="15%" width="512" />
                <path
                  d="m355.6 330 11.4-74h-71v-48c0-20.2 9.9-40 41.7-40h32.3v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6v56.4h-65v74h65v182h80v-182z"
                  fill="#fff"
                />
              </svg>
            </li>
            <li>
              <svg
                height="32"
                width="32"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#fff" height="512" rx="15%" width="512" />
                <path
                  d="m386 400c45-42 65-112 53-179h-179v74h102c-4 24-18 44-38 57z"
                  fill="#4285f4"
                />
                <path
                  d="m90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
                  fill="#34a853"
                />
                <path
                  d="m153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
                  fill="#fbbc02"
                />
                <path
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
                  fill="#ea4335"
                />
              </svg>
            </li>
            <li>
              <svg
                height="32"
                width="32"
                fill="#ed1d24"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="512" rx="15%" width="512" />
                <path
                  d="m427 169c-4-15-17-27-32-31-34-9-239-10-278 0-15 4-28 16-32 31-9 38-10 135 0 174 4 15 17 27 32 31 36 10 241 10 278 0 15-4 28-16 32-31 9-36 9-137 0-174"
                  fill="#fff"
                />
                <path d="m220 203v106l93-53" />
              </svg>
            </li>
            <li>
              <svg
                height="32"
                width="32"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8.9-115.1 44.5-115.1 133.2q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </li>
          </ul>
          <form className="my-5 py-5 border-t-[1px] border-b-[1px] border-gray-200">
            <h3>Sign in with email:</h3>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign in</button>
          </form>
          <h3>Why sign up?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum suspendisse purus netus est mauris. Morbi
            vivamus rutrum ullamcorper maecenas condimentum nunc sed.
          </p>
        </div>
        <p className="xl:mb-5 xl:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <p className="xl:mb-5 xl:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <p className="xl:mb-5 xl:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
      </main>
    </div>
  );
}
