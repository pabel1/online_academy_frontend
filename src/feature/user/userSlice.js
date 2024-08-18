import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfileInfo: builder.query({
      query: (access_token) => {
        return {
          url: `/user/my-profile`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: [""],
    }),

    getAllUsers: builder.query({
      query: ({access_token, page, limit}) => {
        const queryParams = new URLSearchParams();
        if (page) {
          queryParams.append("page", page);
        }
        if (limit) {
          queryParams.append("limit", limit);
        }

        return {
          url: `/user?${queryParams.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      providesTags: [""],
    }),
  }),
});

export const { useGetMyProfileInfoQuery, useGetAllUsersQuery } = userApiSlice;
