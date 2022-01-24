/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

// TODO: Add a bit of organisation and seperate into different files

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

export interface BookFields extends DefaultBookFields {
  description: string;
}

export interface IAuthUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface UseAuthProps {
  session: {
    [x: string]: unknown;
    user?: IAuthUser | undefined;
    expires?: string | undefined;
    // TODO: Remove any types and add required types
    signOut?: any;
    signIn?: any;
  };
}

export interface IUserProps {
  // [index: number]: number;
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  overrides?: object;
}

export interface inputProviderProps {
  props?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ClientProps {
  data?: [] | undefined;
  headers?: {
    customHeaders?: Object;
  };
}

export interface stateData {
  [data: number]: [];
  items?: [] | null;
}
export interface initialStateType {
  status: string;
  data: stateData | undefined;
  error: boolean;
}

export interface IRender {
  route?: string;
  user?: any;
  books?: IBooks;
  renderOptions?: object;
}

export interface IRequestHandler {
  headers: {
    get: (name: string) => {
      replace: (authType: string, token: string) => string;
    };
  };
}

export interface IError extends Error {
  status?: number;
}

// Reusables
export interface BookList {
  books?: IBooks | BookPlaceholder;
}

export type BookPlaceholder = DefaultBookFields[];

export type IBooks = BookFields[];

export type Action =
  | { type: "idle"; payload?: boolean; data?: []; error?: boolean }
  | { type: "pending"; payload?: boolean; data?: []; error?: boolean }
  | { type: "resolved"; payload?: boolean; data?: []; error?: boolean }
  | { type: "rejected"; payload?: boolean; data?: []; error?: boolean };
