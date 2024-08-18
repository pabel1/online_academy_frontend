import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import {
  useCreateModuleResourcesMutation,
  useGetAllModuleResourcesQuery,
  useUpdateResourceMutation,
} from "../../../../../feature/module-resources/moduleResources";

const DbSingleCourseResourceEditForm = ({ courseId }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const auth = useSelector((state) => state?.auth);
  const { id } = useParams();

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

  const { data: resources } = useGetAllModuleResourcesQuery({
    access_token: auth?.access_token,
    moduleId: id,
  });
  console.log("its resourse: ", resources);

  const [updateResource] = useUpdateResourceMutation();

  const [createModuleResources, { isLoading }] =
    useCreateModuleResourcesMutation();

  const onSubmit = async (data) => {
    console.log(data);
    if (!data.git_link && !data.yt_link && !data.content) {
      return toast.error("You haven't change anything!");
    }

    // if (data?.git_link) {
    //   bodyData.append("git_link", data?.git_link);
    // }

    // if (data?.yt_link) {
    //   bodyData.append("yt_link", data?.yt_link);
    // }

    // if (data?.content) {
    //   bodyData.append("content", data?.content);
    // }

    const bodyData = {
      ...(data?.git_link && { git_link: data?.git_link }),
      ...(data?.yt_link && { yt_link: data?.yt_link }),
      ...(data?.content && { content: data?.content }),
      resourceId: resources?.data?._id,
    };
    const res = await updateResource({
      bodyData,
      access_token: auth?.access_token,
    });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigate(`/admin/dashboard/courses/${courseId}`)
      reset();
    } else {
      toast.error("Failed to update resource");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="">
          <div className="form grid grid-cols-1 mt-3 gap-3">
            {/* <div className="grid grid-cols-7 gap-4">
              
              <div className="details col-span-7 lg:col-span-5 grid grid-cols-1 gap-3 lg:order-2 order-1">
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
                
              </div>
            </div> */}
            <div className="githubLink">
              <label htmlFor="githubLink">Github Link</label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="githubLink"
                {...register("git_link")}
                placeholder="Enter github link"
                defaultValue={resources?.data?.git_link}
              />
            </div>
            <div className="yt_link">
              <label htmlFor="yt_link">Youtube Link</label>
              <br />
              <input
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                type="text"
                id="yt_link"
                {...register("yt_link")}
                placeholder="Enter youtube link"
                defaultValue={resources?.data?.yt_link}
              />
            </div>
            <div className="content">
              <label htmlFor="content">Content</label>
              <br />
              <textarea
                className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                rows={3}
                type="text"
                id="content"
                {...register("content")}
                placeholder="Enter module content"
                defaultValue={resources?.data?.content}
              />
            </div>
          </div>
        </div>
        <div className="button flex justify-end mt-2">
          {isLoading ? (
            <button className="bg-[#6440FB] text-white px-7 py-2 rounded-md">
              <span>updating...</span>
            </button>
          ) : (
            <button
              className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
              type="submit"
            >
              <span>Update Resources</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DbSingleCourseResourceEditForm;
