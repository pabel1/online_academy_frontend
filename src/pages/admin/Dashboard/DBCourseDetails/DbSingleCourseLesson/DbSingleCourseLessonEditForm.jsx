import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import {
  useCreateLessonMutation,
  useGetSingleLessonQuery,
  useUpdateSingleLessonMutation,
} from "../../../../../feature/lesson/lessonSlice";

const DbSingleCourseLessonEditForm = ({ courseId }) => {
  const auth = useSelector((state) => state?.auth);
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const { data: lesson } = useGetSingleLessonQuery({
    lessonId: id,
    access_token: auth?.access_token,
  });
  // console.log(lesson?.data);

  const [updateLesson] = useUpdateSingleLessonMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data } = useGetAllCourseModuleQuery({
    access_token: auth?.access_token,
    courseId: courseId,
  });

  const [createLesson, { isLoading }] = useCreateLessonMutation();

  const onSubmit = async (data) => {
    // console.log("on change data : ", data);
    if (!data.title && !data.yt_link && !data.description) {
      return toast.error("You haven't change anything!");
    }
    // if () {
    //   return toast.error("Youtube link is required");
    // }
    // if () {
    //   return toast.error("Description is required");
    // }

    const bodyData = {
      ...(data?.title && { title: data?.title }),
      ...(data?.yt_link && { yt_link: data?.yt_link }),
      ...(data?.description && { description: data?.description }),
      lessonId: id,
    };

    const res = await updateLesson({
      bodyData,
      access_token: auth?.access_token,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate(`/admin/dashboard/courses/${courseId}`)
      reset();
    } else {
      toast.error("Failed to update lesson");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="">
          <div className="form grid grid-cols-1 mt-3 gap-3">
            <div className="title">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="title"
                {...register("title", { shouldUnregister: true })}
                placeholder="Enter lesson title"
                defaultValue={lesson?.data?.title}
              />
            </div>
            <div className="yt_link">
              <label htmlFor="yt_link">
                Youtube Link <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="yt_link"
                {...register("yt_link")}
                placeholder="Enter youtube link"
                defaultValue={lesson?.data?.yt_link}
              />
            </div>
            <div className="description">
              <label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <br />
              <textarea
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                rows={3}
                type="text"
                id="description"
                // defaultValue={auth?.user?.phone}
                {...register("description")}
                placeholder="Enter lesson description"
                defaultValue={lesson?.data?.description}
              />
            </div>
          </div>
        </div>
        <div className="button flex justify-end mt-2">
          {isLoading ? (
            <button className="bg-[#6440FB] text-white px-7 py-2 rounded-md">
              <span>Creating...</span>
            </button>
          ) : (
            <button
              className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
              type="submit"
            >
              <span>Update Lesson</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DbSingleCourseLessonEditForm;
