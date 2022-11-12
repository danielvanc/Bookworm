import { Form, useActionData, useTransition } from "@remix-run/react";
import { TextField } from "./Fields";

export default function LoginWithEmail() {
  const data = useActionData();
  const errors = useActionData();
  const transition = useTransition();
  const isSubmitting = transition.state === "submitting";

  return (
    <Form
      method="post"
      action="/login"
      className="mt-10 grid grid-cols-1 gap-y-8"
    >
      {!errors?.email && data ? (
        <p>Success! Go ahead and click the link in your email!</p>
      ) : (
        <>
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`${
              data?.errors?.email ? "border-red-300 text-red-900" : ""
            }`}
          />
          {data?.errors?.email && <p>Please submit a valid email address</p>}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center rounded-full bg-rosyWorm py-2 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-slate-600"
            >
              {isSubmitting ? "Requesting a login link..." : null}
              {!isSubmitting ? (
                <span>
                  Request a login link <span aria-hidden="true">&rarr;</span>
                </span>
              ) : null}
            </button>
          </div>
        </>
      )}
    </Form>
  );
}
