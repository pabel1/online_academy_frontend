import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useGetCourseEnrolledUsersQuery,
} from "../../../../feature/course/courseSlice";
import { useGetEnrolledUsersQuery } from "../../../../feature/enroll/enrollSlice";
import EnrolledUserTable from "./EnrolledUserTable";

const EnrolledUser = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  // console.log(page);

  const { access_token, user } = useSelector((state) => state?.auth);

  const { data, isLoading, isSuccess } =
    useGetEnrolledUsersQuery({
      access_token: access_token,
      filter,
      page,
      limit: 10,
    }) || {};
  console.log("checking data :", data);

  const { data: enrolledUsers } =
    useGetCourseEnrolledUsersQuery({
      access_token: access_token,
      filter,
    }) || {};
  // console.log("enroll users: ",enrolledUsers);

  const { data: courseData, isLoading: courseLoading } = useGetAllCoursesQuery({
    access_token: access_token,
  });
  // console.log(courseData);

  return (
    <EnrolledUserTable
      data={data?.data}
      courseData={courseData}
      setFilter={setFilter}
      enrolledUsers={enrolledUsers}
      setPage={setPage}
    />
  );
};

export default EnrolledUser;
