import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetSingleCourseQuery } from "../../../../../feature/course/courseSlice";
import { Link, useLocation } from "react-router-dom";
import DBSingleCourseModuleEditForm from "./DBSingleCourseModuleEditForm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

const DBSingleCourseModuleEdit = () => {
  const auth = useSelector((state) => state?.auth);
  const { id } = useParams();
  const location = useLocation()
  const {courseId} = location.state || {}
  // console.log("aaaaaa: ",courseId)

  const [value, setValue] = React.useState(1);

  const { data, isLoading } = useGetSingleCourseQuery({
    courseId,
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
                  aria-label="basic tabs example"
                >
                  <Tab disabled={true} label="Details" {...a11yProps(0)} />
                  {/* <Link to={`/admin/dashboard/courses/${id}`}><Tab label="Details" {...a11yProps(0)} /></Link> */}
                  <Tab label="Module" {...a11yProps(1)} />
                  <Tab disabled={true} label="Lesson" {...a11yProps(2)} />
                  <Tab disabled={true} label="Resources" {...a11yProps(3)} />
                  <Tab disabled={true} label="Quiz" {...a11yProps(4)} />
                </Tabs>
              </Box>
              {/* <CustomTabPanel value={value} index={0}>
                <DbSingleCourseDetails courseId={id} />
              </CustomTabPanel> */}
              <CustomTabPanel value={value} index={1}>
                {/* <DbSingleCourseModule courseId={id} /> */}
                <DBSingleCourseModuleEditForm moduleId={id} courseId={courseId}/>
              </CustomTabPanel>
              {/* <CustomTabPanel value={value} index={2}>
                <DbSingleCourseLesson courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <DbSingleCourseResource courseId={id} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                <DbSingleCourseQuiz courseId={id} />
              </CustomTabPanel> */}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBSingleCourseModuleEdit;
