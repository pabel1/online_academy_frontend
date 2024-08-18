import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ImageUpload from "../Upload/ImageUpload";
import { useCreateCourseMutation } from "../../../feature/course/courseSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
  "@media (max-width: 908px)": {
    width: "90%",
  },
};

const AddNewCourseModal = ({ open, setOpen }) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const auth = useSelector((state) => state?.auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => setOpen(false);

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const onSubmit = async (data) => {
    if (!data.courseName) {
      return toast.error("Please enter course name");
    }

    if (!data.category) {
      return toast.error("Please enter course category");
    }

    const bodyData = new FormData();

    if (selectedFile) {
      bodyData.append("courseImage", selectedFile);
    }

    if (data.courseName) {
      bodyData.append("courseName", data.courseName);
    }

    if (data.category) {
      bodyData.append("category", data.category);
    }

    if (data.details) {
      bodyData.append("description", data.details);
    }

    const res = await createCourse({
      bodyData,
      access_token: auth?.access_token,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message);

      setTimeout(() => {
        navigate(`/admin/dashboard/courses/${res?.data?.data?._id}`);
      }, 1000);
      setOpen(false);
    } else {
      toast.error("Failed to enroll course");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Course</h2>
          <button
            className="bg-gray-400 p-2 rounded-full text-sm"
            onClick={handleClose}>
            <ImCross />
          </button>
        </div>
        <div className="my-7 px-2">
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <div className="">
              {/* <h2 className="text-md font-bold">Billing details</h2> */}
              <div className="form grid grid-cols-1 mt-3 gap-3">
                <div className="grid grid-cols-5 gap-4">
                  <div className="banner col-span-5 lg:col-span-2 order-2 lg:order-1">
                    <div className="course-name">
                      <label htmlFor="course-name">Course Image</label>
                      <br />
                      <ImageUpload
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                      />
                    </div>
                  </div>
                  <div className="details col-span-5 lg:col-span-3 order-1 lg:order-2 grid grid-cols-1 gap-3">
                    <div className="course-name">
                      <label htmlFor="course-name">
                        Course Name <span className="text-red-500">*</span>
                      </label>
                      <br />
                      <input
                        className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                        type="text"
                        id="course-name"
                        {...register("courseName")}
                        placeholder="Enter course name"
                      />
                    </div>
                    <div className="category">
                      <label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <br />
                      <select
                        className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                        type="text"
                        id="category"
                        {...register("category")}
                        placeholder="">
                        <option className="text-gray-600" value="">
                          Please choose&hellip;
                        </option>
                        <option value="Programming">Programming</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Photography">Photography</option>
                        <option value="Music">Music</option>
                        <option value="Health & Fitness">
                          Health & Fitness
                        </option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="IT & Software">IT & Software</option>
                        <option value="Personal Development">
                          Personal Development
                        </option>
                        <option value="Teaching & Academics">
                          Teaching & Academics
                        </option>
                        <option value="Language">Language</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="details">
                  <label htmlFor="phone">Details</label>
                  <br />
                  <textarea
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="details"
                    // defaultValue={auth?.user?.phone}
                    {...register("details")}
                    placeholder="Enter course details"
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
                  <span>Create</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNewCourseModal;
