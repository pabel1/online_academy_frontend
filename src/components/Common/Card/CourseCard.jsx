import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  // console.log("this is course: ",course);
  return (
    <div className="border hover:shadow-md rounded-xl">
      <Link to={`/course/${course?._id}`} className="card-image">
        <img
          className="md:h-48 h-40 w-full object-cover rounded-t-xl cursor-pointer"
          src={
            course?.courseImage?.url ||
            "https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/10/23170101/List-of-Professional-Courses-after-Graduation.gif"
          }
          alt="Course Image"
        />
      </Link>
      <div className="details flex items-center justify-between gap-3 px-4 mt-2">
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-700 bg-[#EAECF0] px-2 py-1 rounded">
            {course?.totalModules + " modules"}
          </p>
          <p className="text-xs text-gray-700 bg-[#EAECF0] px-2 py-1 rounded">
            {course?.totalLessons + " lesson"}
          </p>
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-gray-700 bg-white -mt-28 px-5 py-2 rounded">
          Free
        </p>
      </div>
      <div className="px-4 mb-4 mt-2">
        <div className="mt-6">
          <Link
            to={`/course/${course?._id}`}
            className="text-md text-gray-700 font-bold"
          >
            {course?.courseName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
