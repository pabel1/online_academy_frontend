import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),

  tagTypes: [
    "SingleCourse",
    "courses",
    "Modules",
    "Enrolled",
    "ModulesResources",
    "QUIZ",
    "lessons"
  ],
  endpoints: (builder) => ({}),
});
