import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../../../feature/user/userSlice";
import AllUserTable from "./AllUserTable";

const AllUsers = () => {
  const auth = useSelector((state) => state?.auth);
  const [page, setPage] = useState(1);
  // console.log(page)

  const { data, isLoading } = useGetAllUsersQuery({
    access_token: auth.access_token,
    page,
    limit:10
  });

  return <AllUserTable data={data} setPage={setPage}/>;
};

export default AllUsers;
