import { LoaderFunction } from "remix";
import DiscoverBooks from "~/components/DiscoverBooks";

export const loader: LoaderFunction = async () => {
  return {};
};

export default function HomeOverview() {
  return (
    <>
      <DiscoverBooks />

      <div className="md:p-sectionMedium">
        <div>
          <h3>Bookmarked to read</h3>
        </div>
        <div>
          <h3>Got my eye on</h3>
        </div>
        <div>
          <h3>Read</h3>
        </div>
      </div>
    </>
  );
}
