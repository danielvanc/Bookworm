import { ActionFunction, Form, json, useActionData, useFetcher } from "remix";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let values = {};

  console.log("It runs the action");

  try {
    if (Math.random() > 0.5) throw new Error("Something went wrong");

    values = Object.fromEntries(formData);
  } catch (e) {
    return { error: true };
  }

  return json(values);
};

export async function loader() {
  console.log("It runs the loader");

  return {};
}

export default function Test() {
  let fetcher = useFetcher();
  // let data = useActionData();

  // console.log({ fetcher });
  // console.log({ data });
  return (
    <main className="flex h-[100vh] w-[100vw] place-items-center justify-center">
      <div>
        <fetcher.Form method="post">
          <input type="text" placeholder="Name" name="firstName" />
          <input type="text" placeholder="Name" name="lastName" />
          <button>Submit</button>
        </fetcher.Form>

        {/* {data?.error ? ( */}
        {fetcher.data?.error ? (
          <p className="text-red-500">Ooops! and error occured </p>
        ) : null}
      </div>
    </main>
  );
}
