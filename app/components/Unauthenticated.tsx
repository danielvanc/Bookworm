import { useAuth } from "~/contexts/auth";
import { FaApple, FaTwitter, FaFacebookF, FaGithub } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";

export default function Unauthenticated() {
  const { gitHubLogin, googleLogin, twitterLogin } = useAuth();

  return (
    <div className="unauthed-wrapper">
      <div className="col-start-2 col-end-5 row-start-1 row-span-1 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 xl:self-end pt-20 xl:pt-10 xl:pl-8">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="unauthed-header relative">
        <div className="col-start-1 col-end-6 row-start-1 row-span-full lm:col-span-full  xl:col-start-1 xl:col-end-7 xl:row-start-2 xl:self-end xl:mb-10 pl-[6px]">
          <h1 className="main-heading">Read more</h1>
          <h2 className="sub-heading">
            Find read and spread your love for books
          </h2>
        </div>
        <p className="font-fred text-grayWorm-300 text-sm lm:text-xl col-start-2 col-end-6 row-start-1 row-end-2 self-end lm:row-start-3 lm:row-end-4 lm:col-start-2 lm:col-end-12 lm:self-start md:row-start-2 md:row-end-3 xl:col-start-4 xl:col-end-6 xl:row-start-2 xl:row-end-3 xl:bg-white xl:py-3 xl:pl-3">
          Let your mind escape
        </p>
      </header>

      <main className="row-start-4 row-span-1 col-start-2 col-end-8 lm:col-end-9 md:col-end-7 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 xl:mr-10 pb-10 text-grayWorm-300">
        <p className="text-base md:text-xl 2xl:text-3xl my-12 xl:mb-0 xl:my-8 xl:pl-8 xl:pr-[5rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <div className="border-[1px] rounded-lg bg-white shadow-lg p-5 xl:mr-10 mb-10 xl:mt-10">
          <h2 className="text-center text-2xl font-fred uppercase tracking-widest mb-5">
            Sign in
          </h2>
          <div>
            <ul className="flex justify-between max-w-[300px] mx-auto social-logins">
              {/* <li>
                <button>
                  <FaApple className="text-lg lm:text-xl md:text-2xl" />
                </button>
              </li> */}
              <li>
                <button onClick={googleLogin}>
                  <AiOutlineGoogle className="text-lg lm:text-xl md:text-2xl" />
                </button>
              </li>
              <li>
                <button onClick={twitterLogin}>
                  <FaTwitter className="text-lg lm:text-xl md:text-2xl" />
                </button>
              </li>
              <li>
                <button>
                  <FaFacebookF className="text-lg lm:text-xl md:text-2xl" />
                </button>
              </li>
              <li>
                <button onClick={gitHubLogin}>
                  <FaGithub className="text-lg lm:text-xl md:text-2xl" />
                </button>
              </li>
            </ul>
            <form className="my-5 py-5 max-w-[450px] mx-auto">
              <h3 className="relative text-xs uppercase tracking-widest text-center mb-5 before:border-t-[1px] before:border-gray-200 before:block before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1]">
                <span className="bg-white px-3">Sign in with email</span>
              </h3>
              <div className="flex flex-col xl:flex-row w-full xl:justify-between">
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0 focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Add your email"
                />
                <input
                  className="input xl:max-w-[38%] mb-3 xl:mb-0"
                  type="password"
                  placeholder="Add your Password"
                />
                <button className="btn px-4 pt-2 pb-1 xl:max-w-[35%]">
                  Sign in
                </button>
              </div>
            </form>
            <p className="font-bold text-center text-sm">
              Don't have an account yet? <button>Sign up!</button>
            </p>
          </div>
        </div>
        <div className="xl:text-xl xl:pl-8 xl:pr-14">
          <p className="xl:mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum suspendisse purus netus est mauris. Morbi
            vivamus rutrum ullamcorper maecenas condimentum nunc sed.
          </p>
          <p className="xl:mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque bibendum suspendisse purus netus est mauris. Morbi
            vivamus rutrum ullamcorper maecenas condimentum nunc sed.
          </p>
        </div>
      </main>
    </div>
  );
}
