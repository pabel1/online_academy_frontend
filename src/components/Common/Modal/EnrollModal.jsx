import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";
import { useEnrollCourseMutation } from "../../../feature/enroll/enrollSlice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
  "@media (max-width: 908px)": {
    width: "90%",
  },
};

const EnrollModal = ({ courseName, courseId, open, setOpen }) => {
  const auth = useSelector((state) => state?.auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleClose = () => setOpen(false);

  const [enrollCourse, { isLoading }] = useEnrollCourseMutation();

  const onSubmit = async (data) => {
    const bodyData = {
      ...data,
    };

    if (courseId) {
      bodyData.courseId = courseId;
    }

    if (auth?.user?.fullName === bodyData.fullName) {
      delete bodyData.fullName;
    }

    if (auth?.user?.phone === bodyData.phone) {
      delete bodyData.phone;
    }

    const res = await enrollCourse({
      bodyData,
      access_token: auth?.access_token,
    });

    if (res?.data?.success) {
      toast.success("Enroll successfully!");

      setTimeout(() => {
        navigate(`/enrolled/my-course`);
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
          <h2 className="text-xl font-bold">Course Checkout</h2>
          <button
            className="bg-gray-400 p-2 rounded-full text-sm"
            onClick={handleClose}>
            <ImCross />
          </button>
        </div>
        <div className="my-7 px-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-7 gap-8">
            <div className="col-span-7 lg:col-span-4">
              <h2 className="text-md font-bold">Billing details</h2>
              <div className="form grid grid-cols-1 mt-3 gap-3">
                <div className="full-name">
                  <label htmlFor="full-name">Full Name</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="full-name"
                    defaultValue={auth?.user?.fullName}
                    {...register("fullName", { required: true })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="email"
                    defaultValue={auth?.user?.email}
                    disabled
                    placeholder="Enter your email"
                  />
                </div>
                <div className="phone">
                  <label htmlFor="phone">Phone</label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="phone"
                    defaultValue={auth?.user?.phone}
                    {...register("phone", { required: true })}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-7 lg:col-span-3">
              <h2 className="text-md font-bold">Your order</h2>
              <div className="mt-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-md">Product</h2>
                  <h2 className="text-md">Subtotal</h2>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <h2 className="text-xs">
                    {courseName?.length > 30
                      ? courseName?.slice(0, 30) + "..."
                      : courseName}
                  </h2>
                  <h2 className="text-sm">
                    <span className="line-through">$199.99</span> Free
                  </h2>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <h2 className="text-xs">Subtotal</h2>
                  <h2 className="text-sm">$0</h2>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <h2 className="text-xs font-bold">Total</h2>
                  <h2 className="text-sm font-bold">$0</h2>
                </div>
                <hr className="my-3" />
                <div className="flex justify-end">
                  {isLoading ? (
                    <button
                      type="button"
                      className="bg-[#6440FB] text-white px-4 py-1 rounded-md">
                      Loading...
                    </button>
                  ) : (
                    <button
                    
                      type="submit"
                      className="bg-[#6440FB] text-white px-4 py-1 rounded-md">
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EnrollModal;
