import React from "react";
import DashboardCourse from "../../../../components/Common/Card/DashboardCourse";
import { useGetAllCoursesQuery } from "../../../../feature/course/courseSlice";
import { useSelector } from "react-redux";
import AddNewCourseModal from "../../../../components/Common/Modal/AddNewCourseModal";
import toast from "react-hot-toast";

const CoursesPage = () => {
  const [open, setOpen] = React.useState(false);
  const { user, access_token } = useSelector((state) => state?.auth);

  const { data, isLoading } = useGetAllCoursesQuery(access_token);

  if (isLoading) return <div>Loading...</div>;

  const handleOpen = () => {
    if (!user?.email) {
      return toast.error("Please login first");
    }
    setOpen(true);
  };

  return (
    <div className="px-2 lg:px-6 py-8">
      <div className="mx-auto">
        <div className="bg-white rounded-3xl p-4 lg:p-8  mb-5">
          <div className="flex justify-between">
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-10">
              All Courses
            </h1>
            <div className="">
              <button
                onClick={handleOpen}
                className="bg-[#273c75] text-sm lg:text-md w-full p-2 text-white rounded-lg">
                Add New Course
              </button>
              <AddNewCourseModal open={open} setOpen={setOpen} />
            </div>
          </div>
          <hr className="my-5" />
          <div className="course-card grid grid-cols-1 lg:grid-cols-2 gap-5">
            {data?.data?.data?.map((course, i) => (
              <DashboardCourse course={course} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
