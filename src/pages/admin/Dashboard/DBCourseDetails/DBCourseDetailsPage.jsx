import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DbSingleCourseDetails from "./DbSingleCourseDetails/DbSingleCourseDetails";
import DbSingleCourseModule from "./DbSingleCourseModule/DbSingleCourseModule";
import DbSingleCourseLesson from "./DbSingleCourseLesson/DbSingleCourseLesson";
import DbSingleCourseResource from "./DbSingleCourseResource/DbSingleCourseResource";
import DbSingleCourseQuiz from "./DbSingleCourseQuiz/DbSingleCourseQuiz";
import { useParams } from "react-router";
import { useGetSingleCourseQuery } from "../../../../feature/course/courseSlice";
import { useSelector } from "react-redux";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DBCourseDetailsPage = () => {
  const auth = useSelector((state) => state?.auth);
  const { id } = useParams();

  const [value, setValue] = React.useState(0);

  const { data, isLoading } = useGetSingleCourseQuery({
    courseId: id,
    access_token: auth.access_token,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="px-2 lg:px-6 py-8">
      <div className="mx-auto">
        <div className="bg-white rounded-3xl p-1 lg:p-8 mb-5">
          <h1 className=" text-2xl lg:text-3xl font-bold lg:mb-10 mb-4 mt-5 lg:mt-0">
            {data?.data?.courseName}
          </h1>
          <hr className="my-5" />
          <div className="course-card gap-5">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example">
                  <Tab label="Details" {...a11yProps(0)} />
                  <Tab label="Module" {...a11yProps(1)} />
                  <Tab label="Lesson" {...a11yProps(2)} />
                  <Tab label="Resources" {...a11yProps(3)} />
                  <Tab label="Quiz" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <DbSingleCourseDetails courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <DbSingleCourseModule courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <DbSingleCourseLesson courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <DbSingleCourseResource courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <DbSingleCourseQuiz courseId={id} />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBCourseDetailsPage;
