import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../../components/Common/Modal/ConfirmationModal";
import { useGetAllCourseModuleQuery } from "../../../../../feature/course-module/courseModuleApiSlice";
import DbSingleCourseDetailsVideo from "./DbSingleCourseDetailsVideo";
import { setActiveAccordionId } from "../../../../../feature/videoPlayer/videoPlayerSlice";

const DbSingleCourseDetails = ({ courseId }) => {
  const { access_token } = useSelector((state) => state?.auth);
  const { activeAccordionId } = useSelector((state) => state?.activeVideoUrl);
  const [expanded, setExpanded] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetAllCourseModuleQuery({
    courseId,
    access_token,
  });

  // console.log(data)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    dispatch(setActiveAccordionId(panel))
  };

  if (isLoading) return <div>Loading...</div>;

  const handleClick = (id) => {
    setOpen(true);
  };
  const handleModuleEdit = (id) =>{
    navigate(`/admin/dashboard/courses/ModuleEdit/${id}`, {state: {courseId}})
  }

  return (
    <div>
      {data?.data?.length === 0 ? (
        <div className="h-[40vh] flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-xl font-bold">No Module Found</h1>
            <h2>
              Please add module from{" "}
              <span className="text-[#6440FB]">Module</span> section
            </h2>
          </div>
        </div>
      ) : (
        <div className="">
          {data?.data?.map((item, i) => (
            <Accordion
              key={i}
              expanded={expanded === i}
              onChange={handleChange(i)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: "100%", flexShrink: 0 }}>
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <span className="font-bold">
                        Module {item?.moduleNumber || 1}:
                      </span>{" "}
                      {item?.title || "No title found"}
                    </div>
                    <div className="flex items-center gap-x-1">
                      {/* <CiEdit/> */}
                      <Tooltip title="Delete course module" className="rounded-full p-2 hover:bg-gray-200">
                        <span onClick={() => handleClick(item?._id)}>
                          <RiDeleteBin5Line className="text-[22px] font-extrabold text-red-600 cursor-pointer z-30" />
                        </span>
                        <ConfirmationModal
                          open={open}
                          setOpen={setOpen}
                          confirmation={confirmation}
                          setConfirmation={setConfirmation}
                          moduleId={item?._id}
                          name={item?.title}
                        />
                      </Tooltip>
                      <Tooltip onClick={()=>handleModuleEdit(item?._id)} title="Edit course module" className="rounded-full p-2 mr-4 hover:bg-gray-200">
                        <span>
                          <FiEdit className="text-xl font-extrabold text-blue-600 cursor-pointer z-30" />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
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
      )}
    </div>
  );
};

export default DbSingleCourseDetails;
