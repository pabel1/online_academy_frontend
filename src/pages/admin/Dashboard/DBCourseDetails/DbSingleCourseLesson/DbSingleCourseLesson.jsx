import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../../../components/Common/Upload/ImageUpload";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import { useCreateLessonMutation } from "../../../../../feature/lesson/lessonSlice";

const DbSingleCourseLesson = ({ courseId }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const auth = useSelector((state) => state?.auth);

  const navigate = useNavigate();

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
    if (!data.module) {
      return toast.error("Module is required");
    }
    if (!data.title) {
      return toast.error("Title is required");
    }
    if (!data.yt_link) {
      return toast.error("Youtube link is required");
    }
    if (!data.description) {
      return toast.error("Description is required");
    }

    const bodyData = new FormData();

    bodyData.append("courseId", courseId);

    if (selectedFile) {
      bodyData.append("lessonImage", selectedFile);
    }

    if (data?.module) {
      bodyData.append("moduleId", data?.module);
    }

    if (data?.title) {
      bodyData.append("title", data?.title);
    }

    if (data?.yt_link) {
      bodyData.append("yt_link", data?.yt_link);
    }

    if (data?.description) {
      bodyData.append("description", data?.description);
    }

    const res = await createLesson({
      bodyData,
      access_token: auth?.access_token,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      reset();
      setSelectedFile(null);
    } else {
      toast.error("Failed to enroll course");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="">
          <div className="form grid grid-cols-1 mt-3 gap-3">
            <div className="grid grid-cols-7 gap-4">
              <div className="banner col-span-7 lg:col-span-2 lg:order-1 order-2">
                <div className="course-name">
                  <label htmlFor="course-name">Lesson Image</label>
                  <br />
                  <ImageUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </div>
              </div>
              <div className="details col-span-7 lg:col-span-5 lg:order-2 order-1 grid grid-cols-1 gap-3">
                <div className="module">
                  <label htmlFor="module">
                    Module <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <select
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="module"
                    {...register("module")}
                    placeholder=""
                  >
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
                <div className="title">
                  <label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="title"
                    {...register("title")}
                    placeholder="Enter lesson title"
                  />
                </div>
              </div>
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
              <span>Add Lesson</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DbSingleCourseLesson;
