export async function loader() {
  return {};
}

export default function Discover() {
  // const books = data?.items || [];
  return (
    <div className="md:p-sectionMedium">
      <hr />
      <h1>Discover!</h1>

      {/* <ul className="relative mt-10 flex w-full items-end justify-around overflow-x-auto">
        {books.map((book) => (
          <li key={book.id} className="pr-20">
            <a href={book.volumeInfo.infoLink}>
              {book.volumeInfo.title}
              <img
                src={book.volumeInfo?.imageLinks?.smallThumbnail}
                alt={book.volumeInfo.title}
              />
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
