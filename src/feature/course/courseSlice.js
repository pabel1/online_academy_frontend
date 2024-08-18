import { apiSlice } from "../api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: ({ access_token, category }) => {
        let link = `/course`;

        if (category) {
          link = `/course?category=${category}`;
        }

        return {
          url: link,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["courses"],
    }),

    getCategories: builder.query({
      query: ({ access_token }) => {
        return {
          url: `/course/categories`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["courses"]
    }),

    getSingleCourse: builder.query({
      query: ({ courseId, access_token }) => {
        return {
          url: `/course/${courseId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["courses"],
    }),

    createCourse: builder.mutation({
      query: ({ access_token, bodyData }) => {
        return {
          url: `/course`,
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
      invalidatesTags: ["courses"],
    }),

    getCourseEnrolledUsers: builder.query({
      query: ({ access_token, filter }) => {
        // console.log("filter in slice", filter);
        const queryParams = new URLSearchParams();

        if (filter && filter !== "All") {
          // console.log(searchStr);
          queryParams.append("courseName", filter);
        }

        return {
          url: `/course/enrolledCourseUsers?${queryParams.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Enrolled"],
    }),

    getAllTotalForDb: builder.query({
      query: (access_token) => {
        return {
          url: `/course/total-all-for-db`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
    }),

    deleteCourse: builder.mutation({
      query: ({ courseId, access_token }) => {
        return {
          url: `/course/${courseId}`,
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
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useCreateCourseMutation,
  useGetAllTotalForDbQuery,
  useGetCategoriesQuery,
  useGetCourseEnrolledUsersQuery,
  useDeleteCourseMutation
} = courseApiSlice;
