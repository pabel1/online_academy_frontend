import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import toast from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDeleteResourceMutation } from "../../../feature/module-resources/moduleResources";
import { useDeleteQuizMutation } from "../../../feature/quiz/quizSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
  "@media (max-width: 908px)": {
    width: "90%",
  },
};

const DeleteQuizModal = ({ open, setOpen, name, quizId }) => {
  const handleClose = () => setOpen(false);
  //   console.log(confirmation);
  const { access_token } = useSelector((state) => state?.auth);
  const [deleteQuiz] = useDeleteQuizMutation();

  const deleteSingleQuiz = async (id) => {
    const res = await deleteQuiz({
      quizId: id,
      access_token,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
      
    } else {
      toast.error("Failed to delete quiz");
    }
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="p-5 ">
          <div className="w-full ">
            <div className="flex justify-center">
              <BiErrorCircle className="text-center text-7xl font-semibold text-green-600" />
            </div>
            <p className="text-center text-xl font-medium">
              Are you sure to delete {name ? name : ""}?
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 space-x-5">
            <button
              onClick={handleClose}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-gray-100 py-2 rounded-md "
            >
              Cancel
            </button>
            <button
              onClick={() => deleteSingleQuiz(quizId)}
              className="border-2 border-green-600 text-gray-100 bg-green-600 hover:bg-gray-100 hover:text-green-600 py-2 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteQuizModal;
