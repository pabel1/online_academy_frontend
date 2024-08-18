import { apiSlice } from "../api/apiSlice";

export const enrollApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enrollCourse: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/enroll`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["Enrolled", "courses", "Modules"],
    }),

    getMyEnrolledCourses: builder.query({
      query: ({ access_token }) => {
        return {
          url: `/enroll/get-my-enrolled-courses`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Enrolled"],
    }),

    getAllEnrollUserBySingleCourse: builder.query({
      query: ({ access_token, courseId }) => {
        return {
          url: `/enroll/course/${courseId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Enrolled"],
    }),

    getEnrolledUsers: builder.query({
      query: ({ access_token, filter, limit, page }) => {
        // console.log("limit and page : ", limit, page);
        const queryParams = new URLSearchParams();

        if (filter && filter !== "All") {
          // console.log(searchStr);
          queryParams.append("courseName", filter);
        }
        if (page) {
          queryParams.append("page", page);
        }
        if (limit) {
          queryParams.append("limit", limit);
        }

        return {
          url: `/enroll?${queryParams.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: ["Enrolled"],
    }),

    updateStatus: builder.mutation({
      query: (data) => {
        const { status, access_token, enrollId } = data;
        return {
          url: `/enroll/${enrollId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: status,
        };
      },
      invalidatesTags: ["Enrolled", "courses"],
    }),
  }),
});

export const {
  useEnrollCourseMutation,
  useGetMyEnrolledCoursesQuery,
  useGetEnrolledUsersQuery,
  useGetAllEnrollUserBySingleCourseQuery,
  useUpdateStatusMutation,
} = enrollApiSlice;
