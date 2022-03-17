/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

export interface DefaultBookFields {
  id: number;
  title: string;
  image: string;
  description: string;
  volumeInfo: {
    title: string;
  };
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

// export interface BookFields extends DefaultBookFields {
//   description: string;
// }

// export interface IRender {
//   route?: string;
//   user?: any;
//   books?: IBooks;
//   renderOptions?: object;
// }

export interface IError extends Error {
  status?: number;
}

// Reusables
// export interface BookList {
//   books?: IBooks | BookPlaceholder;
// }

// export type BookPlaceholder = DefaultBookFields[];

// export type IBooks = BookFields[];

export type Action =
  | { type: "idle"; payload?: boolean; data?: []; error?: boolean }
  | { type: "pending"; payload?: boolean; data?: []; error?: boolean }
  | { type: "resolved"; payload?: boolean; data?: []; error?: boolean }
  | { type: "rejected"; payload?: boolean; data?: []; error?: boolean };
