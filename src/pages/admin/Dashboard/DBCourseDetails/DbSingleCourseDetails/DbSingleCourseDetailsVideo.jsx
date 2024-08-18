import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteLessonModal from "../../../../../components/Common/Modal/DeleteLessonModal";
import DeleteQuizModal from "../../../../../components/Common/Modal/DeleteQuizModal";
import DeleteResourceModal from "../../../../../components/Common/Modal/DeleteResourceModal";
import {
  useGetAllLessonByModuleIdQuery,
  useLessonViewMutation,
} from "../../../../../feature/lesson/lessonSlice";
import { useGetAllModuleResourcesQuery } from "../../../../../feature/module-resources/moduleResources";
import {
  useCreateSubmitQuizMutation,
  useGetAllQuizQuery,
  useGetMyQuizMarkQuery,
} from "../../../../../feature/quiz/quizSlice";
import { setAccordionVideoUrl } from "../../../../../feature/videoPlayer/videoPlayerSlice";

const DbSingleCourseDetailsVideo = ({
  moduleId,
  courseId,
  moduleName,
  accordionId,
}) => {
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoTime, setVideoTime] = React.useState(0);
  const [videoStart, setVideoStart] = React.useState(false);
  const [answerList, setAnswerList] = React.useState([]);
  const [quiz, setQuiz] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [ResourceOpen, setResourceOpen] = React.useState(false);
  const [DeleteQuizOpen, setDeleteQuizOpen] = React.useState(false);

  const [viewedLessonId, setViewedLessonId] = React.useState("");
  const [lessonViewed, setLessonViewed] = React.useState();

  const [lockedModule, setLockedModule] = React.useState([]);

  const dispatch = useDispatch();
  const { access_token, user } = useSelector((state) => state?.auth);
  const { activeAccordionId, activeVideoUrls } = useSelector(
    (state) => state?.activeVideoUrl
  );
  console.log("video url: ", activeAccordionId, accordionId, activeVideoUrls);

  const navigate = useNavigate();
  const location = useLocation();

  const isEnrolledCourseRoute =
    location.pathname.includes("/enrolled/courses/");
  // console.log(location);

  const { data, isLoading } = useGetAllLessonByModuleIdQuery({
    moduleId,
    access_token,
  });
  // console.log("checking lesson data: ", data);

  const handleClick = () => {
    setOpen(true);
  };

  const handleDeleteQuizClick = () => {
    setDeleteQuizOpen(true);
  };

  const handleResourceClick = () => {
    setResourceOpen(true);
  };

  const handleLessonEdit = (id) => {
    navigate(`/admin/dashboard/courses/LessonEdit/${id}`, {
      state: { courseId },
    });
  };
  // console.log(data);

  const handleResourceEdit = (id) => {
    navigate(`/admin/dashboard/courses/resourceEdit/${id}`, {
      state: { courseId },
    });
  };

  const handleQuiz = (id) => {
    navigate(`/admin/dashboard/courses/quizEdit/${id}`, {
      state: { courseId },
    });
  };

  const handleVideoReady = () => {
    // setVideoTitle(player.getInternalPlayer().getVideoData().title);
    // // setVideoStart(true);
    // console.log(player.getInternalPlayer().getVideoData().title);
    !videoTitle && setVideoTitle(data?.data?.[0]?.title);
  };

  const { data: resourceData, isLoading: resourceLoading } =
    useGetAllModuleResourcesQuery({
      moduleId,
      access_token,
    });
  // console.log("resource data : ",resourceData)

  const { data: quizMark, isLoading: markLoading } = useGetMyQuizMarkQuery({
    moduleId,
    access_token,
  });

  const { data: quizData, isLoading: quizLoading } = useGetAllQuizQuery({
    moduleId,
    access_token,
  });

  const [lessonView, { isLoading: lessonViewLoading, isSuccess }] =
    useLessonViewMutation();

  const [createSubmitQuiz, { isLoading: submitQuizLoading }] =
    useCreateSubmitQuizMutation();

  if (isLoading) return <div>Loading...</div>;

  const handleVideoChange = async (link, lessonId, viewed, title) => {
    setQuiz(false);
    // setVideoLink(link)
    setVideoStart(true);
    setVideoTitle(title);

    setViewedLessonId(lessonId);
    setLessonViewed(viewed);
  };

  const handleVideoClick = (accordionId, link, lessonId, viewed, title) => {
    console.log(link);
    // dispatch(resetVideoUrl());
    dispatch(setAccordionVideoUrl({ accordionId, videoUrl: link }));

    handleVideoChange(link, lessonId, viewed, title);
  };

  const youtubeUrl = `${videoLink || data?.data?.[0]?.yt_link || null}`;

  const handleAnswer = (questionId, answer) => {
    const data = {
      questionId,
      answer,
    };

    const index = answerList.findIndex(
      (item) => item.questionId === questionId
    );
    if (index === -1) {
      setAnswerList([...answerList, data]);
    } else {
      answerList[index] = data;
      setAnswerList([...answerList]);
    }
  };

  const handleAnswerSubmit = async () => {
    if (quizData.data.length !== answerList.length) {
      return toast.error("Please answer all the questions!");
    }

    const bodyData = {
      moduleId,
      courseId,
      answerList,
    };

    const res = await createSubmitQuiz({ access_token, bodyData });

    if (res?.data?.success) {
      toast.success("Quiz Submitted Successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const videoEnded = async () => {
    const bodyData = {
      lessonId: viewedLessonId || data?.data?.[0]?._id,
    };

    if (!lessonViewed) {
      await lessonView({ bodyData, access_token });
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-5 gap-5">
        {quiz ? (
          <div className="col-span-5 lg:col-span-3 h-[360px] overflow-y-auto">
            {quizMark?.data?.score >= 0 ? (
              <div className="h-full flex justify-center items-center">
                <div className="grid gap-2">
                  <h2 className="text-center text-xl">Your quiz mark is</h2>
                  <div className="bg-gray-300 mx-auto px-8 py-3 rounded-md">
                    <h1 className="text-4xl font-semibold text-center">
                      {quizMark?.data?.score}
                    </h1>
                    <hr className="w-16 border-2 border-black" />
                    <h1 className="text-4xl font-semibold text-center">
                      {quizData?.data?.length || "N/A"}
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-semibold">Quiz</h1>
                <div className="px-5">
                  {quizData?.data?.map((item, i) => (
                    <div className="bg-gray-100 p-2 rounded-lg mt-2">
                      <div className="flex justify-between items-center">
                        <h2 className="text-md font-semibold">
                          {i + 1}. {item?.question}
                        </h2>
                        {!isEnrolledCourseRoute && (
                          <div className="flex items-center">
                            <div
                              onClick={() => handleDeleteQuizClick()}
                              className="rounded-full p-1 hover:bg-gray-200 cursor-pointer text-red-600"
                            >
                              <RiDeleteBin5Line />
                            </div>
                            <div
                              onClick={() => handleQuiz(item?._id)}
                              className="rounded-full p-1 hover:bg-gray-200 cursor-pointer text-blue-600"
                            >
                              <FiEdit />
                            </div>
                            <DeleteQuizModal
                              open={DeleteQuizOpen}
                              setOpen={setDeleteQuizOpen}
                              quizId={item?._id}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col ml-5">
                        {item?.options?.map((option, j) => (
                          <div key={j} className="flex items-center text-sm">
                            <input
                              onClick={() => handleAnswer(item._id, option)}
                              type="radio"
                              name={item._id}
                              id={option}
                            />
                            <label htmlFor={option} className="ml-2">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-end mr-10">
                  {submitQuizLoading ? (
                    <button className="bg-[#6440FB] text-white px-7 py-2 rounded-md">
                      Submitting...
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAnswerSubmit()}
                      className="bg-[#6440FB] text-white px-7 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="video col-span-5 lg:col-span-3">
            {activeAccordionId === accordionId &&
              activeVideoUrls[accordionId] && (
                <ReactPlayer
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  width="100%"
                  playing={videoStart}
                  controls={true}
                  url={activeVideoUrls[accordionId]}
                  // url={youtubeUrl}
                  youtubeConfig={{
                    playerVars: {
                      rel: 0,
                    },
                  }}
                  onProgress={(e) => console.log(e.playedSeconds)}
                  onEnded={() => videoEnded()}
                  onReady={handleVideoReady}
                />
              )}
            {activeAccordionId === accordionId &&
              !activeVideoUrls[accordionId] && <div className="bg-black/80 w-full h-full flex items-center justify-center text-gray-200 text-sm"> To play video click on lesson in right side</div>}

            {activeAccordionId === accordionId &&
              activeVideoUrls[accordionId] && <h2 className="text-xl my-3">
              <span className="font-bold">Video: </span>
              {videoTitle || data?.data?.[0]?.title || "No Video Found"}
            </h2>}
            {/* ----------resource  */}
            {activeAccordionId === accordionId &&
              activeVideoUrls[accordionId] && resourceData?.data ? (
              <div className="mt-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Resources: </h2>
                  <div className="flex items-center gap-1">
                    {!isEnrolledCourseRoute && (
                      <div
                        onClick={() => handleResourceClick()}
                        className="rounded-full p-1 hover:bg-gray-200"
                      >
                        <RiDeleteBin5Line className="text-[22px] font-extrabold text-red-600 cursor-pointer z-30" />
                      </div>
                    )}
                    {!isEnrolledCourseRoute && (
                      <span
                        onClick={() => handleResourceEdit(moduleId)}
                        className="rounded-full p-1 hover:bg-gray-200"
                      >
                        <FiEdit className="text-xl font-extrabold text-blue-600  cursor-pointer z-30" />
                      </span>
                    )}

                    <DeleteResourceModal
                      open={ResourceOpen}
                      setOpen={setResourceOpen}
                      resourceId={resourceData?.data?._id}
                    />
                  </div>
                </div>
                <div className="">
                  {resourceData?.data?.yt_link && (
                    <p className="text-md mt-2">
                      <span className="font-semibold">Link:</span>{" "}
                      {
                        <a
                          target="_blank"
                          className="hover:underline cursor-pointer"
                          href={resourceData?.data?.git_link}
                        >
                          {resourceData?.data?.yt_link}
                        </a>
                      }
                    </p>
                  )}
                  {resourceData?.data?.git_link && (
                    <p className="text-md mt-2">
                      <span className="font-semibold">Github:</span>{" "}
                      {
                        <a
                          className="hover:underline cursor-pointer"
                          target="_blank"
                          href={resourceData?.data?.git_link}
                        >
                          {resourceData?.data?.git_link}
                        </a>
                      }
                    </p>
                  )}
                  {resourceData?.data?.content && (
                    <p className="text-md mt-2 bg-gray-100 p-2 rounded-lg">
                      {resourceData?.data?.content || "No Content"}
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="details col-span-5 lg:col-span-2">
          <Accordion expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <span className="font-bold">{moduleName}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List
                className=""
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  height: 260,
                  bgcolor: "background.paper",
                  overflow: "auto",
                }}
                component="nav"
                aria-label="mailbox folders"
              >
                {quizData?.data?.length > 0 && (
                  <ListItem onClick={() => setQuiz(true)} button>
                    <ListItemText primary="Quiz" />
                  </ListItem>
                )}

                <Divider />
                {data?.data?.map((item, i) => (
                  <>
                    <div className="flex items-center justify-between">
                      <ListItem
                        onClick={() =>
                          handleVideoClick(
                            accordionId,
                            item?.yt_link,
                            item?._id,
                            item?.viewed,
                            item?.title
                          )
                        }
                        key={i}
                        button
                      >
                        {item?.title === videoTitle ? (
                          <MdCheckCircle className="mr-2 text-green-500" />
                        ) : (
                          <MdOutlineRadioButtonUnchecked className="mr-2" />
                        )}
                        <ListItemText
                          primary={(i, " . ", item?.title)}
                          className={`${
                            item?.title === videoTitle ? "text-blue-600" : ""
                          } capitalize`}
                        />
                      </ListItem>
                      <span>
                        {!isEnrolledCourseRoute && (
                          <div
                            onClick={() => handleClick()}
                            title="Delete lesson"
                            className="rounded-full hover:bg-gray-200 flex items-center justify-center p-1 "
                          >
                            <RiDeleteBin5Line className="text-base font-extrabold  cursor-pointer z-30 text-red-500" />
                          </div>
                        )}

                        {!isEnrolledCourseRoute && (
                          <div
                            onClick={() => handleLessonEdit(item?._id)}
                            title="Edit Lesson"
                            className="rounded-full hover:bg-gray-200 flex items-center justify-center p-1 "
                          >
                            <FiEdit className="text-base font-extrabold text-blue-600  cursor-pointer z-30" />
                            {/* /admin/dashboard/courses/LessonEdit/${item?._id} */}
                          </div>
                        )}

                        <DeleteLessonModal
                          open={open}
                          setOpen={setOpen}
                          lessonId={item?._id}
                          name={item?.title}
                          setVideoLink={setVideoLink}
                          setVideoTitle={setVideoTitle}
                        />
                      </span>
                    </div>
                    <Divider />
                  </>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DbSingleCourseDetailsVideo;
