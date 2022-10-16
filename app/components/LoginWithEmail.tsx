import * as React from "react";
import { TextField } from "./Fields";

export default function LoginWithEmail() {
  return (
    <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
      <TextField
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <TextField
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <div>
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center rounded-full bg-rosyWorm py-2 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span>
            Sign in <span aria-hidden="true">&rarr;</span>
          </span>
        </button>
      </div>
    </form>
  );
}
