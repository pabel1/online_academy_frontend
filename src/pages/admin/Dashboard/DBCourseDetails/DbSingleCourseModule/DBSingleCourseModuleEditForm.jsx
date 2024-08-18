import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetSingleModuleQuery,
  useUpdateSingleModuleMutation,
} from "../../../../../feature/course-module/courseModuleApiSlice";

const DBSingleCourseModuleEditForm = ({ moduleId, courseId }) => {
  // console.log("moduleId in form : ", moduleId);
  const { access_token } = useSelector((state) => state?.auth);

  const { data: moduleData } = useGetSingleModuleQuery({
    moduleId,
    access_token,
  });
  //   console.log("data vai: ", data?.data[0]);
  // const [createModule, { isLoading }] = useCreateModuleMutation();
  const [updateEnroll, { isLoading }] = useUpdateSingleModuleMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data?.moduleName && !data?.moduleNumber && !data?.description) {
        return toast.error("You haven't change anything!");
      }
    // if (!data?.moduleName) {
    //   return toast.error("Module name is required");
    // }

    // if (!data?.moduleNumber) {
    //   return toast.error("Module number is required");
    // }

    // if (!data?.description) {
    //   return toast.error("Description is required");
    // }

    // if (isNaN(data?.moduleNumber)) {
    //   return toast.error("Module number must be a number");
    // }

    const bodyData = {
      ...(data?.moduleName && { title: data?.moduleName }),
      ...(data?.moduleNumber &&
        !isNaN(data.moduleNumber) && {
          moduleNumber: Number(data.moduleNumber),
        }),
      ...(data?.description && { description: data.description }),
      moduleId,
    };

    const res = await updateEnroll({
      bodyData,
      access_token,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate(`/admin/dashboard/courses/${courseId}`);
      }, 1000);

      reset();
      setOpen(false);
    } else {
      toast.error("Failed to update module");
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
                defaultValue={moduleData?.data[0].title}
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
                defaultValue={moduleData?.data[0].moduleNumber}
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
                defaultValue={moduleData?.data[0].description}
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
              <span>Update Module</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DBSingleCourseModuleEditForm;
