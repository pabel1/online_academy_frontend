import { useSelector } from "react-redux";
import { useGetMyEnrolledCoursesQuery } from "../../feature/enroll/enrollSlice";
import SingleCourseCard from "../../components/Common/Card/SingleCourseCard";
import CourseCardSk from "../../components/Common/Skeletons/CourseCardSk";

const MyCoursePage = () => {
  const { user, access_token } = useSelector((state) => state?.auth);
  const { data, isLoading, isSuccess } = useGetMyEnrolledCoursesQuery(
    { access_token },
    { refetchOnReconnect: true, skip: !access_token }
  );
  // console.log(data);
  
  let content;
  if (isLoading && !isSuccess) {
    content = Array(4)
      .fill(null)
      .map((_, i) => <CourseCardSk key={i} />);
  } else if (!isLoading && isSuccess) {
    content = data?.data?.map((data, i) => (
      <SingleCourseCard data={data} key={i} />
    ));
  }

  return (
    <section className="p-2 lg:p-0 ">
      <h2 className="text-lg lg:text-xl font-bold mb-2 container">
        Hello {user?.fullName}!
      </h2>
      <h2 className="text-xl lg:text-3xl container">Welcome to your Enrolled Courses</h2>

      {data?.data?.length === 0 ? (
        <div className="text-center my-10">
          <h2 className="text-2xl">You have no enrolled courses</h2>
          <p className="text-lg">Please enroll to a course</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10 container">
          {content}
        </div>
      )}
    </section>
  );
};

export default MyCoursePage;
