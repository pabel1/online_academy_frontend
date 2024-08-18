import React from "react";
import CourseCard from "../../Common/Card/CourseCard";
import { useGetAllCoursesQuery } from "../../../feature/course/courseSlice";
import { useSelector } from "react-redux";
import SingleCardSk from "../../Common/Skeletons/SingleCardSk";

const MarketingCourses = () => {
  const { access_token } = useSelector((state) => state?.auth);

  const { data, isLoading, isSuccess } = useGetAllCoursesQuery({
    access_token,
    category: "Marketing",
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((item) => (
          <SingleCardSk key={item} />
        ))}
      </div>
    );

  return (
    <div>
      {data?.data?.data?.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <div className="">
            <img
              className="h-16 w-16"
              src="https://i.ibb.co/cvwp7zm/folder.png"
              alt="noData"
            />
            <h2 className="font-semibold">No Data !</h2>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-8">
          {data?.data?.data?.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketingCourses;
