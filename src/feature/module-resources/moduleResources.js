import { apiSlice } from "../api/apiSlice";

export const moduleResourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createModuleResources: builder.mutation({
      query: ({ access_token, bodyData }) => {
        return {
          url: `/module-resources`,
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
      invalidatesTags: ["ModulesResources"],
    }),

    getAllModuleResources: builder.query({
      query: ({ moduleId, access_token }) => ({
        url: `/module-resources/${moduleId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
      providesTags: ["ModulesResources"],
    }),

    updateResource: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/module-resources/${bodyData?.resourceId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["modules", "courses", "ModulesResources"],
    }),

    deleteResource: builder.mutation({
      query: ({ resourceId, access_token }) => {
        return {
          url: `/module-resources/${resourceId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["ModulesResources"],
    }),
  }),
});

export const {
  useCreateModuleResourcesMutation,
  useGetAllModuleResourcesQuery,
  useUpdateResourceMutation,
  useDeleteResourceMutation
} = moduleResourcesApiSlice;
