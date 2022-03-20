import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async () => {
  return {};
};

export default function Index() {
  return (
    <div className="bg-slate-700">
      <p>In the main section</p>
    </div>
  );
}
