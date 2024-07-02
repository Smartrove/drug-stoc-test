import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";

const { backendDev } = config;

const apiLink = backendDev;

interface ImageLinks {
  thumbnail: string;
  smallThumbnail: string;
}
interface VolumeInfo {
  title?: string;
  authors?: string[];
  subtitle?: string;
  publisher?: string;
  publishedDate?: string;
  description?: string;
  imageLinks?: ImageLinks;
}

interface BookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: object;
  accessInfo: object;
  searchInfo?: object | string;
}

interface BookType {
  items: BookItem[];
  totalItems: number;
}

export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiLink,
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<BookType, string>({
      query: (payload) => ({
        url: `?q=${payload}`,
      }),
    }),
  }),
});

export const { useGetBooksQuery } = crudApi;
export type { BookType };
