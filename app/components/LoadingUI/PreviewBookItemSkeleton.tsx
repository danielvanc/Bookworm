export default function PreviewBookItemSkeleton({
  blocksToShow = 3,
}: {
  blocksToShow?: number;
}) {
  const blocks = Array.from({ length: blocksToShow }, (_, i) => i);

  return (
    <>
      {blocks.map((_, idx) => (
        <div
          key={`s-${idx}`}
          className="relative mb-6 flex animate-pulse flex-col divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex flex-col items-start p-8 md:flex-row">
            <div className="mx-auto h-60 w-1/5 flex-shrink-0 rounded-lg bg-gray-300 shadow-md">
              &nbsp;
            </div>
            <div className="w-4/5 py-5 md:py-0 md:pl-10 md:pr-2">
              <div className="h-10 w-full animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-3 h-6 w-7 animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
              <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-300">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
