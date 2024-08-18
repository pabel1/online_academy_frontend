import { apiSlice } from "../api/apiSlice";

export const courseModuleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourseModule: builder.query({
      query: ({ access_token, courseId }) => {
        return {
          url: `/course-module/course/${courseId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Modules"],
    }),
    createModule: builder.mutation({
      query: ({ access_token, bodyData }) => {
        return {
          url: `/course-module`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["Modules"],
    }),
    getSingleModule: builder.query({
      query: ({ moduleId, access_token }) => {
        return {
          url: `/course-module/${moduleId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Modules", "courses"],
    }),

    updateSingleModule: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/course-module/${bodyData?.moduleId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["Modules", "courses", "enrolled"],
    }),

    deleteModule: builder.mutation({
      query: ({ moduleId, access_token }) => {
        return {
          url: `/course-module/${moduleId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["Modules", "courses"],
    }),
  }),
});

export const {
  useGetAllCourseModuleQuery,
  useCreateModuleMutation,
  useGetSingleModuleQuery,
  useUpdateSingleModuleMutation,
  useDeleteModuleMutation,
} = courseModuleApiSlice;
