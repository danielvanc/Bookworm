import { faker } from "@faker-js/faker";

export function buildBookList(total: number = 10, overrides?: Partial<Book>) {
  const books: Book[] = [];

  Array(total).forEach(() => {
    const book = {
      id: faker.datatype.uuid(),
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      link: faker.internet.url(),
      reading: faker.datatype.boolean(),
      read: faker.datatype.boolean(),
      ...overrides,
    };
    books.push(book);
  });

  return books;
}
