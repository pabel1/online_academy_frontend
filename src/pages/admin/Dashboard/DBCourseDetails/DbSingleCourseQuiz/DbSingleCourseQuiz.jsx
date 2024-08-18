import React from "react";
import { useForm } from "react-hook-form";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import toast from "react-hot-toast";
import { useCreateQuizMutation } from "../../../../../feature/quiz/quizSlice";

const DbSingleCourseQuiz = ({ courseId }) => {
  const [questionList, setQuestionList] = React.useState([]);
  const [moduleId, setModuleId] = React.useState("");

  const auth = useSelector((state) => state?.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data } = useGetAllCourseModuleQuery({
    access_token: auth?.access_token,
    courseId: courseId,
  });

  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  const onSubmit = async (data) => {
    const requiredFields = [
      "question",
      "module",
      "option1",
      "option2",
      "option3",
      "option4",
      "answer",
    ];

    requiredFields.forEach((field) => {
      if (!data[field]) {
        return toast.error(`${field} is required!`);
      }
    });

    const options = [data.option1, data.option2, data.option3, data.option4];

    const isValidAnswer = options.includes(data.answer);

    if (!isValidAnswer) {
      return toast.error("Answer must be one of the options!");
    }

    const question = {
      courseId: courseId,
      moduleId: data.module,
      question: data.question,
      options: options,
      answer: data.answer,
    };

    const res = await createQuiz({
      access_token: auth?.access_token,
      bodyData: question,
    });

    if (res?.data?.success) {
      toast.success("Quiz created successfully!");

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
              <div className="question col-span-4 lg:col-span-2">
                <label htmlFor="question">Question</label>
                <br />
                <input
                  className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                  type="text"
                  id="question"
                  {...register("question")}
                  placeholder="Enter question"
                />
              </div>
              <div className="module col-span-4 lg:col-span-2">
                <label htmlFor="module">
                  Module <span className="text-red-500">*</span>
                </label>
                <br />
                <select
                  className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                  type="text"
                  id="module"
                  {...register("module")}
                  placeholder="">
                  <option className="text-gray-600" value="">
                    Please choose module&hellip;
                  </option>
                  {data?.data?.map((item) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.title}
                    </option>
                  ))}
                </select>
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
                />
              </div>
            </div>
          </div>
          <div className="button flex justify-end mt-4 lg:mt-2">
            {isLoading ? (
              <button
                className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
                type="button">
                <span>Creating...</span>
              </button>
            ) : (
              <button
                className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
                type="submit">
                <span>Add Question</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DbSingleCourseQuiz;
