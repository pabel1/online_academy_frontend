import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateModuleMutation } from "../../../../../feature/course-module/courseModuleApiSlice";
import toast from "react-hot-toast";

const DbSingleCourseModule = ({ courseId }) => {
  const auth = useSelector((state) => state?.auth);

  const [createModule, { isLoading }] = useCreateModuleMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data?.moduleName) {
      return toast.error("Module name is required");
    }

    if (!data?.moduleNumber) {
      return toast.error("Module number is required");
    }

    if (!data?.description) {
      return toast.error("Description is required");
    }

    if (isNaN(data?.moduleNumber)) {
      return toast.error("Module number must be a number");
    }

    const bodyData = {
      title: data?.moduleName,
      moduleNumber: Number(data?.moduleNumber),
      description: data?.description,
      courseId: courseId,
    };

    const res = await createModule({
      bodyData,
      access_token: auth?.access_token,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      // setTimeout(() => {
      //   navigate(`/admin/dashboard/courses/${res?.data?.data?._id}`);
      // }, 1000);

      reset();
      setOpen(false);
    } else {
      toast.error("Failed to create module");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="">
          <div className="form grid grid-cols-2 mt-3 gap-5">
            <div className="course-name col-span-1">
              <label htmlFor="module-name">
                Module Name <span className="text-red-500">*</span>
              </label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="module-name"
                {...register("moduleName")}
                placeholder="Enter module name"
              />
            </div>
            <div className="module-number col-span-1">
              <label htmlFor="module-number">
                Module Number<span className="text-red-500">*</span>
              </label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="module-number"
                {...register("moduleNumber")}
                placeholder="Enter module number"
              />
            </div>
            <div className="description col-span-2">
              <label htmlFor="phone">Description</label>
              <br />
              <textarea
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                rows={3}
                id="description"
                // defaultValue={auth?.user?.phone}
                {...register("description")}
                placeholder="Enter description"
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
              type="submit">
              <span>Add Module</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DbSingleCourseModule;
