import { Form, useActionData, useNavigation } from "@remix-run/react";
import { TextField } from "./Fields";
import { ActionFunctionArgs } from "@remix-run/node";
import { action } from "~/routes/login";

export default function LoginWithEmail() {
  const data = useActionData<typeof action>();
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  return (
    <Form
      method="post"
      action="/login"
      className="mt-10 grid grid-cols-1 gap-y-8"
    >
      {data ? (
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
          />

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-rosyWorm group inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-slate-600"
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
