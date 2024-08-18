import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../../feature/course/courseSlice";
import AllCourses from "./AllCourses";
import DynamicCourses from "./DynamicCourses";

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

const Courses = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { access_token } = useSelector((state) => state?.auth);
  const { data, isLoading, isSuccess } = useGetCategoriesQuery({
    access_token,
  });
  // console.log(data?.data?.uniqueCategories);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="container mt-5 lg:mt-10 mb-5">
      <div className="">
        <h2 className="text-center text-xl lg:text-3xl font-semibold">
          Our Most Popular Courses
        </h2>
        <p className="text-center text-sm lg:text-md">
          1000+ unique online course list designs
        </p>
      </div>
      <div className="course-tab mt-5 lg:mt-10 flex justify-center">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs
              centered
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#273c75",
                },
                "& .MuiTab-root": {
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "1rem",
                  fontWeight: "600",
                  letterSpacing: "0.025em",
                  lineHeight: "1.75",
                  minWidth: "100px",
                  "&.Mui-selected": {
                    color: "#273c75",
                  },
                },
              }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="All Courses" {...a11yProps(0)} />
              {/* <Tab label="Popular" {...a11yProps(1)} />
              <Tab label="Programming" {...a11yProps(2)} />
              <Tab label="Marketing" {...a11yProps(3)} /> */}
              {data?.data?.uniqueCategories.map((tab, i) => {
                return <Tab label={tab} {...a11yProps(i + 1)} />;
              })}
            </Tabs>
          </Box>
        </Box>
      </div>

      <CustomTabPanel value={value} index={0} dir={theme.direction}>
        <AllCourses />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1} dir={theme.direction}>
        <PopularCourses />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} dir={theme.direction}>
        <ProgrammingCourses />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} dir={theme.direction}>
        <MarketingCourses />
      </CustomTabPanel> */}

      {data?.data?.uniqueCategories.map((category, i) => {
        return (
          <CustomTabPanel value={value} index={i + 1} dir={theme.direction}>
            <DynamicCourses category={category} />
          </CustomTabPanel>
        );
      })}
    </div>
  );
};

export default Courses;
