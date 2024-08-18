import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import toast from "react-hot-toast";
import { RiArrowDropRightLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/favicon.png";
import EnrollModal from "../../components/Common/Modal/EnrollModal";
import { useGetAllCourseModuleQuery } from "../../feature/course-module/courseModuleApiSlice";
import { useGetSingleCourseQuery } from "../../feature/course/courseSlice";
import {
  useGetAllEnrollUserBySingleCourseQuery,
  useGetMyEnrolledCoursesQuery,
} from "../../feature/enroll/enrollSlice";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<RiArrowDropRightLine size={26} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#f8fafc" : "#f8fafc",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const SingleCourse = () => {
  const { id: courseId } = useParams();
  // const [alreadyEnrolled, setAlreadyEnrolled] = React.useState(false);
  const { access_token, user } = useSelector((state) => state?.auth);
  const [open, setOpen] = React.useState(false);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { data, isLoading, isSuccess } = useGetSingleCourseQuery({
    courseId,
    access_token,
  });
  // console.log(data);

  const { data: myEnrolledCourse } = useGetMyEnrolledCoursesQuery({
    access_token,
  });
  console.log(myEnrolledCourse);

  const { data: moduleData, isLoading: moduleLoadingData } =
    useGetAllCourseModuleQuery({ courseId, access_token });

  const { data: enrolledUser } = useGetAllEnrollUserBySingleCourseQuery({
    access_token,
    courseId,
  });
  // console.log(enrolledUser);

  const handleOpen = () => {
    if (!user?.email) {
      return toast.error("Please login first");
    }
    setOpen(true);
  };

  const alreadyEnrolled = myEnrolledCourse?.data?.find(
    (course) => course?.courseId === courseId
  );
  // console.log(alreadyEnrolled);

  const isPending = myEnrolledCourse?.data?.find(
    (course) => course?.courseId === courseId && course?.status === "pending"
  );
  // console.log(isPending);

  const ButtonForEnroll = () => {
    if (alreadyEnrolled && isPending) {
      return (
        <div>
          <button
            className="bg-[#6440FB] text-sm lg:text-lg w-full py-2 lg:py-3 text-white rounded-lg block text-center cursor-not-allowed"
            disabled
          >
            Pending
          </button>
        </div>
      );
    }

    if (alreadyEnrolled && !isPending) {
      return (
        <div>
          <Link
            to={`/enrolled/courses/${courseId}`}
            className="bg-[#6440FB] text-sm lg:text-lg w-full py-2 lg:py-3 text-white rounded-lg block text-center"
          >
            Visit Course
          </Link>
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={handleOpen}
          className="bg-[#6440FB] text-sm lg:text-lg w-full py-2 lg:py-3 text-white rounded-lg block text-center"
        >
          Enroll Now
        </button>
      </div>
    );
  };

  return (
    <section>
      <div className="grid grid-cols-6 gap-5">
        <div className="col-span-6 lg:col-span-4 lg:order-1 order-2 p-2 lg-p-0">
          <div className="">
            <div className="badge flex gap-4">
              <span className="bg-green-300 rounded-xl px-4 py-1 text-xs">
                Best Seller
              </span>
              <span className="bg-red-400 rounded-xl px-4 py-1 text-xs text-white">
                New
              </span>
              <span className="bg-[#6440FB] rounded-xl px-4 py-1 text-xs text-white">
                Popular
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl text-gray-700 my-6">
              {data?.data?.courseName}
            </h2>
            <p className="text-md w-full lg:w-[60%] text-gray-700 mb-10">
              {data?.data?.description}
            </p>
            <div className="mt-5 mb-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs lg:text-sm">
                <p className="text-gray-700 text-xs lg:text-sm">4.5</p>
                <p className="mb-[1px] text-xs lg:text-sm">⭐⭐⭐⭐⭐</p>
                {/* <p className="text-gray-700 text-xs lg:text-sm">(500+)</p> */}
              </div>
              <p className="text-gray-700 text-xs lg:text-sm">
                {enrolledUser?.data.length}{" "}
                {enrolledUser?.data.length === 1 ? "student" : "students"}{" "}
                enrolled
              </p>
              <p className="text-gray-700 text-xs lg:text-sm">
                Last updated 10/2023
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={logo}
                alt=""
              />
              <p className="text-sm text-gray-700">OnLine Academy</p>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="mb-5">
              <span className="text-2xl text-gray-700">What you'll learn</span>
            </h2>
            {moduleData?.data?.map((module, i) => (
              <Accordion
                expanded={expanded === `panel${i + 1}`}
                onChange={handleChange(`panel${i + 1}`)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography className="">{module?.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{module?.description}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 h-full w-full lg:order-2 order-1 p-2 lg:p-0">
          <div className="border p-2 rounded-lg">
            <div className="">
              <img
                className="w-full h-42 lg:h-64 object-cover rounded-lg"
                src={
                  data?.data?.courseImage?.url ||
                  "https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/10/23170101/List-of-Professional-Courses-after-Graduation.gif"
                }
                alt=""
              />
            </div>
            <div className="flex justify-between px-5 my-5 items-center">
              <p className="text-lg lg:text-2xl text-gray-700">Free</p>
              <p className="text-lg line-through text-gray-500">BDT199.99</p>
            </div>
            <div className="button px-5 my-5">
              {
                // alreadyEnrolled ? (
                //   <Link
                //     to={`/enrolled/courses/${courseId}`}
                //     className="bg-[#6440FB] text-sm lg:text-lg w-full py-2 lg:py-3 text-white rounded-lg block text-center"
                //   >
                //     VISIT COURSE
                //   </Link>
                // ) : (
                //   <>
                //     <button
                //       onClick={handleOpen}
                //       className="bg-[#6440FB] text-sm lg:text-lg w-full py-2 lg:py-3 text-white rounded-lg"
                //     >
                //       ENROLL NOW
                //     </button>
                //   </>
                // )
                <ButtonForEnroll />
              }

              <EnrollModal
                courseName={data?.data?.courseName}
                courseId={courseId}
                open={open}
                setOpen={setOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
