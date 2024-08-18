import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import {
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "../../../../../feature/quiz/quizSlice";
import { useNavigate } from "react-router-dom";

const DbSingleCourseQuizEditForm = ({ courseId, quizId }) => {
  const [questionList, setQuestionList] = React.useState([]);
  const [moduleId, setModuleId] = React.useState("");
  const navigate = useNavigate()

  const auth = useSelector((state) => state?.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: quiz } = useGetSingleQuizQuery({
    quizId,
    access_token: auth?.access_token,
  });
  // console.log("quiz",quiz)

  const { data } = useGetAllCourseModuleQuery({
    access_token: auth?.access_token,
    courseId: courseId,
  });

  // const [createQuiz, { isLoading }] = useCreateQuizMutation();
  const [updateQuiz, { isLoading }] = useUpdateQuizMutation();

  const onSubmit = async (data) => {
    // console.log(data);
    const { option1, option2, option3, option4 } = data;
    const updatedOptions = [...quiz?.data?.[0]?.options];
    if (option1) updatedOptions[0] = option1;
    if (option2) updatedOptions[1] = option2;
    if (option3) updatedOptions[2] = option3;
    if (option4) updatedOptions[3] = option4;

    // console.log("hello: ", updatedOptions);
    if (
      !data.question &&
      !data.answer &&
      !data.option1 &&
      !data.option2 &&
      !data.option3 &&
      !data.option4
    ) {
      return toast.error("You haven't change anything!");
    }

    const isValidAnswer = updatedOptions.includes(data.answer);

    // const requiredFields = [
    //   "question",
    //   "module",
    //   "option1",
    //   "option2",
    //   "option3",
    //   "option4",
    //   "answer",
    // ];

    // requiredFields.forEach((field) => {
    //   if (!data[field]) {
    //     return toast.error(`${field} is required!`);
    //   }
    // });

    // const options = [data.option1, data.option2, data.option3, data.option4];

    // const isValidAnswer = options.includes(data.answer);

    // if (!isValidAnswer) {
    //   return toast.error("Answer must be one of the options!");
    // }

    const question = {
      quizId,
      ...(data?.question && { question: data?.question }),
      options: updatedOptions,
      ...(data?.answer && { answer: data?.answer }),
    };

    const res = await updateQuiz({
      access_token: auth?.access_token,
      bodyData: question,
    });

    if (res?.data?.success) {
      toast.success("Quiz updated successfully!");
      navigate(`/admin/dashboard/courses/${courseId}`)
      reset();
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid">
          <div className="">
            <div className="form grid grid-cols-4 mt-3 gap-3">
              <div className="question col-span-4">
                <label htmlFor="question">Question</label>
                <br />
                <input
                  className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                  type="text"
                  id="question"
                  {...register("question")}
                  placeholder="Enter question"
                  defaultValue={quiz?.data?.[0]?.question}
                />
              </div>

              <div className="options col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="option1">
                  <label htmlFor="option1">Option 1</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="option1"
                    {...register("option1")}
                    placeholder="Enter option 1"
                    defaultValue={quiz?.data?.[0]?.options[0]}
                  />
                </div>
                <div className="option2">
                  <label htmlFor="option2">Option 2</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="option2"
                    {...register("option2")}
                    placeholder="Enter option 2"
                    defaultValue={quiz?.data?.[0]?.options[1]}
                  />
                </div>
                <div className="option3">
                  <label htmlFor="option3">Option 3</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="option3"
                    {...register("option3")}
                    placeholder="Enter option 3"
                    defaultValue={quiz?.data?.[0]?.options[2]}
                  />
                </div>
                <div className="option4">
                  <label htmlFor="option4">Option 4</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="option4"
                    {...register("option4")}
                    placeholder="Enter option 4"
                    defaultValue={quiz?.data?.[0]?.options[3]}
                  />
                </div>
              </div>
              <div className="answer col-span-4  lg:col-span-2">
                <label htmlFor="answer">Answer</label>
                <br />
                <input
                  className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                  type="text"
                  id="answer"
                  {...register("answer")}
                  placeholder="Enter answer"
                  defaultValue={quiz?.data?.[0]?.answer}
                />
              </div>
            </div>
          </div>
          <div className="button flex justify-end mt-4 lg:mt-2">
            {isLoading ? (
              <button
                className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
                type="button"
              >
                <span>Creating...</span>
              </button>
            ) : (
              <button
                className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
                type="submit"
              >
                <span>Update Quiz</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DbSingleCourseQuizEditForm;
