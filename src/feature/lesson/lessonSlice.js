import { apiSlice } from "../api/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLessonByModuleId: builder.query({
      query: ({ access_token, moduleId }) => {
        return {
          url: `/lesson/module/${moduleId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["courses", "lessons", "Modules"],
    }),
    lessonView: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/view-lesson`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["courses", "lessons", "Modules"],
    }),
    createLesson: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/lesson`,
          method: "POST",
          preparedHeaders: (headers) => {
            headers.set("Content-type", "multipart/form-data");
            return headers;
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: bodyData,
          formData: true,
        };
      },
      invalidatesTags: ["courses", "lessons", "Modules"],
    }),

    getSingleLesson: builder.query({
      query: ({ lessonId, access_token }) => {
        return {
          url: `/lesson/${lessonId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["lessons", "Modules", "courses"],
    }),

    updateSingleLesson: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/lesson/${bodyData?.lessonId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["lessons", "courses", "Modules"],
    }),

    deleteLesson: builder.mutation({
      query: ({ lessonId, access_token }) => {
        return {
          url: `/lesson/${lessonId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["lessons", "courses", "Modules"],
    }),
  }),
});

export const {
  useGetAllLessonByModuleIdQuery,
  useLessonViewMutation,
  useCreateLessonMutation,
  useGetSingleLessonQuery,
  useUpdateSingleLessonMutation,
  useDeleteLessonMutation,
} = lessonApiSlice;
