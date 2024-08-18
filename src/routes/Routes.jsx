import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import UserRoute from "./UserRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/Auth/LoginPage";
import Errorpage from "../pages/Errorpage/Errorpage";
import RegisterPage from "../pages/Auth/RegisterPage";
import SingleCoursePage from "../pages/SingleCourse/SingleCourse";
import AdminMain from "../layouts/AdminMain";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import SingleCourse from "../pages/SingleCourse/SingleCourse";
import CoursesPage from "../pages/Admin/Dashboard/Courses/CoursesPage";
import DashboardMain from "../pages/Admin/Dashboard/DashboardMain";
import MyCoursePage from "../pages/MyCourse/MyCoursePage";
import CourseDetails from "../pages/MyCourse/CourseDetails";
import DBCourseDetailsPage from "../pages/Admin/Dashboard/DBCourseDetails/DBCourseDetailsPage";
import EnrolledUser from "../pages/Admin/Dashboard/EnrolledUser/EnrolledUser";
import AllUsers from "../pages/Admin/Dashboard/AllUsers/AllUsers";
import DBSingleCourseModuleEdit from "../pages/admin/Dashboard/DBCourseDetails/DbSingleCourseModule/DBSingleCourseModuleEdit";
import DbSingleCourseLessonEdit from "../pages/admin/Dashboard/DBCourseDetails/DbSingleCourseLesson/DbSingleCourseLessonEdit";
import DbSingleCourseResourceEdit from "../pages/admin/Dashboard/DBCourseDetails/DbSingleCourseResource/DbSingleCourseResourceEdit";
import DbSingleCourseQuizEdit from "../pages/admin/Dashboard/DBCourseDetails/DbSingleCourseQuiz/DbSingleCourseQuizEdit"
import Form from "../components/Common/Form/Form";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/course/:id",
        element: <SingleCourse />,
      },
      {
        path: "/course/:id",
        element: <SingleCoursePage />,
      },
    ],
  },
  {
    path: "/temp",
    element: <Form/>
  },

  {
    path: "/enrolled",
    element: (
      <PrivateRoute
        allowedRoles={["Super Admin", "Admin", "Moderator", "User"]}
        path={"/login"}>
        <Main />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/enrolled/my-course",
        element: <MyCoursePage />,
      },
      {
        path: "/enrolled/courses/:courseId",
        element: <CourseDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UserRoute path={"/"}>
        <LoginPage />
      </UserRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <UserRoute path={"/"}>
        <RegisterPage />
      </UserRoute>
    ),
  },
  {
    path: "*",
    element: <Errorpage />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute
        allowedRoles={["Super Admin", "Admin", "Moderator"]}
        path={"/login"}>
        <AdminMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/admin/dashboard",
            element: <DashboardMain />,
          },
          {
            path: "/admin/dashboard/courses",
            element: <CoursesPage />,
          },
          {
            path: "/admin/dashboard/courses/:id",
            element: <DBCourseDetailsPage />,
          },
          {
            path: "/admin/dashboard/courses/ModuleEdit/:id",
            element: <DBSingleCourseModuleEdit/>,
          },
          {
            path: "/admin/dashboard/courses/LessonEdit/:id",
            element: <DbSingleCourseLessonEdit/>,
          },
          {
            path: "/admin/dashboard/courses/resourceEdit/:id",
            element: <DbSingleCourseResourceEdit/>,
          },
          {
            path: "/admin/dashboard/courses/quizEdit/:id",
            element: <DbSingleCourseQuizEdit/>,
          },
          {
            path: "/admin/dashboard/enrolled-users",
            element: <EnrolledUser />,
          },
          {
            path: "/admin/dashboard/all-users",
            element: <AllUsers />,
          },
        ],
      },
    ],
  },
]);
