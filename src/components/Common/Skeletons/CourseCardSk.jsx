import React from "react";
import imgp from "../../../assets/images/imgp.jpg";

const CourseCardSk = () => {
  return (
    <div className="bg-white rounded-lg border grid grid-cols-5 gap-4 p-3 h-[200px]">
      <div className="col-span-2 h-[176px]">
        <img
          src={imgp}
          alt=""
          className="rounded-md h-full w-full object-cover"
        />
      </div>
      <div className="col-span-3 py-2">
        <h2 className="h-3.5 bg-gray-200 w-40 animate-pulse"></h2>
        <h2 className="h-5 bg-gray-200 w-3/4 mt-3 animate-pulse"></h2>
        <h2 className="h-4 bg-gray-200 animate-pulse w-1/4 mt-5 mb-10"></h2>
        <div className="h-8 bg-gray-200 w-1/2 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default CourseCardSk;
