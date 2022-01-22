export default function Unauthenticated() {
  return (
    <div className="grid grid-cols-8 gap-3 lm:grid-cols-12 lm:gap-2 md:gap-4 xl:grid-cols-main-desktop 2xl:grid-cols-main-xl-desktop auto-rows-12">
      <div className="col-start-2 col-end-5 lm:col-start-2 lm:col-end-6 xl:col-start-2 xl:col-end-3 row-start-1 row-span-1 2xl:col-start-3 2xl:col-end-4 2xl:row-auto">
        <img src="/images/logo.svg" alt="" width="131" height="38" />
      </div>

      <header className="grid grid-cols-8 gap-3 lm:grid-cols-12 lm:gap-2 md:gap-4 xl:grid-cols-header-desktop 2xl:grid-cols-header-xl-desktop row-start-2 row-end-4 xl:col-start-1 xl:col-end-2 2xl:col-start-2 2xl:col-end-3  2xl:row-auto uppercase text-grayWorm-300 col-span-full">
        <h1 className="col-start-1 col-end-6 row-start-1 row-span-full lm:col-span-full lm:text-center opacity-5 leading-tighter lm:leading-10 lm:opacity-100 xl:col-start-1 xl:col-end-7 2xl:col-end-2 2xl:row-auto font-fred text-hMedium lm:text-hSmall desktop:text-hLarge desktop:leading-none 2xl:-rotate-90">
          Read more
        </h1>
        <h2 className="font-fred text-grayWorm-300 text-sm lm:text-base desktop:text-h2Normal desktop:leading-3 col-start-2 col-end-6 row-start-1 row-end-2 self-center lm:row-start-2 lm:row-end-3 lm:col-span-full lm:self-start lm:text-center xl:col-start-1 2xl:col-end-2">
          Find read and spread your love for books
        </h2>
        <p className="font-fred text-grayWorm-300 text-sm lm:text-xl col-start-2 col-end-6 row-start-1 row-end-2 self-end lm:row-start-3 lm:row-end-4 lm:col-start-2 lm:col-end-12 lm:self-start xl:col-start-4 xl:col-end-5 2xl:col-start-2 2xl:col-end-3 2xl:row-start-1 2xl:row-span-full">
          Let your mind escape
        </p>
      </header>

      <main className="row-start-4 row-span-1 col-start-2 col-end-6 lm:col-end-9 xl:col-start-2 xl:col-end-3 xl:row-start-2 xl:row-end-4 2xl:col-start-3 2xl:col-end-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
        <div>
          {/* <button onClick={() => session.signIn()}>Sign in</button> */}
        </div>
        <h3>Why sign up?</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          bibendum suspendisse purus netus est mauris. Morbi vivamus rutrum
          ullamcorper maecenas condimentum nunc sed.
        </p>
      </main>
    </div>
  );
}
