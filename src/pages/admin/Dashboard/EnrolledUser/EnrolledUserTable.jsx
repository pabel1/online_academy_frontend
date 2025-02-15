import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateStatusModal from "../../../../components/Common/Modal/UpdateStatusModal";

const EnrolledUserTable = ({
  data,
  courseData,
  setFilter,
  enrolledUsers,
  setPage,
}) => {
  const auth = useSelector((state) => state?.auth);
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const handleOpen = (id, status) => {
    // console.log("status: ",id, status)
    setId(id);
    setStatus(status);
    if (!auth.user?.email) {
      return toast.error("Please login first");
    }
    setOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Users</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="h-full rounded-r border sm:rounded-r-none block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              >
                <option>All</option>
                {courseData?.data?.data?.map((item, i) => (
                  <option key={i}>{item?.courseName}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* <div className="block relative w-1/3">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div> */}
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Enroll Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item?.user?.fullName}
                            </p>
                            <p className="text-xs text-gray-900 whitespace-no-wrap">
                              {item?.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {item?.course?.courseName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          <span
                            onClick={() => handleOpen(item?._id, item?.status)}
                            className={`px-5 py-1 font-semibold leading-tight ${
                              item?.status === "pending"
                                ? "bg-blue-100 text-blue-500 hover:bg-blue-200"
                                : "bg-lime-600 text-lime-100"
                            } rounded-full text-xs cursor-pointer`}
                          >
                            {item?.status}
                          </span>
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <span className="px-5 py-1 font-semibold leading-tight bg-green-100 text-green-800 rounded-full text-xs">
                            Free
                          </span>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {/* {new Date(item?.enrolledDate).toLocaleDateString()} */}
                        {moment(item?.enrolledDate).format("Do MMMM YYYY")}
                      </td>
                      <UpdateStatusModal
                        itemId={id}
                        status={status}
                        open={open}
                        setOpen={setOpen}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {data?.data.length} of {data?.meta?.total} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() =>
                    setPage(data?.meta?.page > 1 ? data?.meta?.page - 1 : 1)
                  }
                  className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setPage(
                      Math.ceil(data?.meta?.total / data?.meta?.limit) >=
                        data?.meta?.page
                        ? data?.meta?.page + 1
                        : data?.meta?.page
                    )
                  }
                  className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledUserTable;
