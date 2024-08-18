import React from "react";
import { useSelector } from "react-redux";
import { AiFillCrown } from "react-icons/ai";
import { useGetAllTotalForDbQuery } from "../../../feature/course/courseSlice";

const DashboardMain = () => {
  // console.log(open);

  const { user, access_token } = useSelector((state) => state?.auth);

  const { data } = useGetAllTotalForDbQuery({
    access_token,
  });

  return (
    <div className="px-2 lg:px-6 py-8">
      <div className="mx-auto">
        <div className="bg-white rounded-3xl p-8 mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-10">
            Welcome, {user?.fullName}
          </h1>

          <hr className="my-5" />

          <div className="card grid col-span-1 md:col-span-2 lg:grid-cols-4 gap-5">
            <div className="border rounded-md border-t-4 border-t-[#DB2777] p-4 hover:shadow-md hover:cursor-pointer">
              <div className="">
                <h2 className="font-bold text-3xl">
                  {data?.data?.totalEnrolledUser}+
                </h2>
                <p className="text-md mt-2">Total Enrolled</p>
              </div>
              <div className="icon flex justify-end">
                <AiFillCrown className="text-[#DB2777] text-3xl" />
              </div>
            </div>
            <div className="border rounded-md border-t-4 border-t-[#DB2777] p-4 hover:shadow-md hover:cursor-pointer">
              <div className="">
                <h2 className="font-bold text-3xl">
                  {data?.data?.totalUsers}+
                </h2>
                <p className="text-md mt-2">Total User</p>
              </div>
              <div className="icon flex justify-end">
                <AiFillCrown className="text-[#DB2777] text-3xl" />
              </div>
            </div>
            <div className="border rounded-md border-t-4 border-t-[#DB2777] p-4 hover:shadow-md hover:cursor-pointer">
              <div className="">
                <h2 className="font-bold text-3xl">
                  {data?.data?.totalCourse}+
                </h2>
                <p className="text-md mt-2">Total Courses</p>
              </div>
              <div className="icon flex justify-end">
                <AiFillCrown className="text-[#DB2777] text-3xl" />
              </div>
            </div>
            <div className="border rounded-md border-t-4 border-t-[#DB2777] p-4 hover:shadow-md hover:cursor-pointer">
              <div className="">
                <h2 className="font-bold text-3xl">
                  {data?.data?.totalModule}+
                </h2>
                <p className="text-md mt-2">Total Module</p>
              </div>
              <div className="icon flex justify-end">
                <AiFillCrown className="text-[#DB2777] text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
