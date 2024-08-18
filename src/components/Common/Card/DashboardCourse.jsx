import React, { useState } from "react";
import { Link } from "react-router-dom";
import { btn } from "../../../utils/tailwind-classes";
import DeleteCourseModal from "../Modal/DeleteCourseModal";

const DashboardCourse = ({ course }) => {
  console.log(course);
  const [open, setOpen] = useState(false);

  const handleDeleteCourseClick = () => {
    setOpen(true);
  };
  return (
    <div className="bg-white rounded-lg border hover:shadow-lg grid grid-cols-7 gap-4 p-3">
      <div className="col-span-4">
        <img
          src={
            course?.courseImage?.url ||
            "https://res.cloudinary.com/nayem1816/image/upload/v1700968062/online-course-application/courseImage/vtu7trwcehd8y3mmvmit.png"
          }
          alt=""
          className="rounded-md h-full lg:h-52 w-full object-cover"
        />
      </div>
      <div className="col-span-3 py-2 grid">
        <div className="">
          <h2 className="font-bold mt-1 text-md lg:text-lg text-primaryColor">
            {course?.courseName || "Course Name"}
          </h2>
          <h2 className="text-xs font-bold bg-orange-100 text-orange-500 py-1 px-3 w-fit rounded mt-3 lg:mt-0 mb-10">
            {course?.category || "Category"}
          </h2>
        </div>
        <div onClick={()=>handleDeleteCourseClick()} className={`${btn} w-full text-center bg-red-500 mb-1 cursor-pointer`}>Delete Course</div>
        <div className="place-content-end flex items-end justify-start">
          <Link
            to={`/admin/dashboard/courses/${course?._id}`}
            className={`w-full text-center bg-[#273c75] ${btn}`}>
            Continue Course
          </Link>
        </div>
        <DeleteCourseModal open={open} setOpen={setOpen} courseId={course?._id}/>
      </div>
    </div>
  );
};

export default DashboardCourse;
