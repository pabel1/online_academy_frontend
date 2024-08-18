import { Link } from "react-router-dom";
import { btn } from "../../../utils/tailwind-classes";
import { calculateDuration } from "../../../utils/durationCalculate";

const SingleCourseCard = ({ data }) => {
  const { course, enrolledDate, courseId, status } = data;
  return (
    <div className="bg-white rounded-lg border hover:shadow-lg grid grid-cols-5 gap-4 p-3 h-[200px]">
      <div className="col-span-2 h-full">
        <img
          src={course?.courseImage?.url}
          alt=""
          className="rounded-md h-full w-full object-cover"
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between py-2">
        <div>
          <h2 className="text-xs lg:text-sm text-gray-400">
            Enrolled {calculateDuration(enrolledDate)}
          </h2>
          <h2 className="font-bold mt-1 text-md lg:text-lg text-primaryColor">
            {course?.courseName}
          </h2>
          <h2 className="text-xs font-bold bg-orange-100 text-orange-500 py-1 px-3 w-fit mt-2 lg:mt-4 rounded">
            {course?.category}
          </h2>
        </div>
        <div>
          {
              status === "pending" ? <button className={`bg-[#273c75] ${btn} cursor-not-allowed mt-1`}>Pending</button> : <Link
              to={`/enrolled/courses/${courseId}`}
              className={`bg-[#273c75] ${btn} mt-1`}>
              Continue Course
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCard;
