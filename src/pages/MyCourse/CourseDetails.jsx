import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetAllCourseModuleQuery } from "../../feature/course-module/courseModuleApiSlice";
import { setActiveAccordionId } from "../../feature/videoPlayer/videoPlayerSlice";
import DbSingleCourseDetailsVideo from "../Admin/Dashboard/DBCourseDetails/DbSingleCourseDetails/DbSingleCourseDetailsVideo";

const CourseDetails = () => {
  const [expanded, setExpanded] = React.useState(0);
  const dispatch = useDispatch();
  const { activeAccordionId } = useSelector((state) => state?.activeVideoUrl);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    dispatch(setActiveAccordionId(panel));
  };

  // const handleAccordionToggle = (event, accordionId) => {
  //   dispatch(setActiveAccordionId(accordionId));
  // };
  const { courseId } = useParams();

  const { access_token, user } = useSelector((state) => state?.auth);
  // console.log(user)
  const { data } = useGetAllCourseModuleQuery(
    { access_token, courseId },
    { refetchOnReconnect: true, skip: !access_token }
  );
  // console.log(data);

  return (
    <section>
      {data?.data?.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-3xl font-bold">No Module Found</h1>
        </div>
      ) : null}
      <div>
        {data?.data?.map((item, i) => (
          <Accordion
            key={i}
            expanded={expanded === i}
            onChange={handleChange(i)}
            // onChange={(event, accordionId)=>handleAccordionToggle(event, i+1)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <span className="font-bold">
                  Module {item?.moduleNumber || 1}:
                </span>{" "}
                {item?.title || "No title found!"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DbSingleCourseDetailsVideo
                courseId={courseId}
                moduleId={item?._id}
                moduleName={item?.title}
                accordionId={i}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default CourseDetails;
