import { useAuth } from "~/contexts/auth";
import { FaApple, FaTwitter, FaFacebookF, FaGithub } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
export default function Unauthenticated() {
  const { login } = useAuth();

  return (
    <div className="unauthed-wrapper">
      <div className="col-start-2 col-end-5 row-start-1 row-span-1 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 xl:self-end xl:pt-10 xl:pl-8">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="unauthed-header relative">
        <div className="col-start-1 col-end-6 row-start-1 row-span-full lm:col-span-full  xl:col-start-1 xl:col-end-7 xl:self-end xl:mb-10">
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
        <p className="text-3xl xl:my-8 xl:pl-8 xl:pr-[5rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <div className="border-[1px] rounded-lg p-5 xl:mr-10 xl:mb-10">
          <h2 className="text-center text-2xl font-fred uppercase tracking-widest mb-5">
            Sign in
          </h2>
          <div>
            <ul className="flex justify-between max-w-[300px] mx-auto social-logins">
              <li>
                <button>
                  <FaApple className="text-2xl" />
                </button>
              </li>
              <li>
                <button>
                  <AiOutlineGoogle className="text-2xl" />
                </button>
              </li>
              <li>
                <button>
                  <FaTwitter className="text-2xl" />
                </button>
              </li>
              <li>
                <button>
                  <FaFacebookF className="text-2xl" />
                </button>
              </li>
              <li>
                <button onClick={login}>
                  <FaGithub className="text-2xl" />
                </button>
              </li>
            </ul>
            <form className="my-5 py-5 max-w-[450px] mx-auto">
              <h3 className="relative text-xs uppercase tracking-widest text-center mb-5 before:border-t-[1px] before:border-gray-200 before:block before:absolute before:left-0 before:right-0 before:bottom-[8px] before:z-[-1]">
                <span className="bg-white px-3">Sign in with email</span>
              </h3>
              <div className="flex w-full justify-between">
                <input
                  className="input max-w-[38%]"
                  type="email"
                  placeholder="Add your email"
                />
                <input
                  className="input  max-w-[38%]"
                  type="password"
                  placeholder="Add your Password"
                />
                <button className="btn px-4 pt-2 pb-1 max-w-[35%]">
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
