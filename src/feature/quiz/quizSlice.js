import { apiSlice } from "../api/apiSlice";

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: ({ access_token, bodyData }) => {
        return {
          url: `/quiz`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["QUIZ"],
    }),

    getAllQuiz: builder.query({
      query: ({ moduleId, access_token }) => ({
        url: `/quiz/${moduleId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["QUIZ"],
    }),

    getSingleQuiz: builder.query({
      query: ({ quizId, access_token }) => ({
        url: `/quiz/singleQuiz/${quizId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["QUIZ"],
    }),

    createSubmitQuiz: builder.mutation({
      query: ({ access_token, bodyData }) => {
        return {
          url: `/quiz/answer-list`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["QUIZ"],
    }),

    getMyQuizMark: builder.query({
      query: ({ moduleId, access_token }) => ({
        url: `/quiz/mark/${moduleId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }),
      providesTags: ["QUIZ"],
    }),

    updateQuiz: builder.mutation({
      query: (data) => {
        const { bodyData, access_token } = data;
        return {
          url: `/quiz/${bodyData?.quizId}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: bodyData,
        };
      },
      invalidatesTags: ["QUIZ"],
    }),

    deleteQuiz: builder.mutation({
      query: ({ quizId, access_token }) => {
        return {
          url: `/quiz/${quizId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
      },
      invalidatesTags: ["QUIZ"],
    }),

  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizQuery,
  useCreateSubmitQuizMutation,
  useGetMyQuizMarkQuery,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation
} = quizApiSlice;
