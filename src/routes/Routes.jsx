import { createBrowserRouter } from "react-router-dom";
import AdminStatistics from "../components/Dashboard/Statistics/AdminStatistics";
import DashboardLayout from "../layOuts/DashboardLayout";
import Main from "../layOuts/Main";
import Meals from "../pages/allMeals/Meals";
import AddMeal from "../pages/dashboard/admin/addMeal/AddMeal";
import AllMeals from "../pages/dashboard/admin/allMeals/AllMeals";
import ManageUsers from "../pages/dashboard/admin/manageUsers/ManageUsers";
import UpdateMeal from "../pages/dashboard/admin/updateMeal/UpdateMeal";
import Profile from "../pages/dashboard/common/Profile";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import MealDetails from "../pages/mealDetails/MealDetails";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/register/Register";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "meal-details/:id",
        element: <MealDetails />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <AdminStatistics />
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoutes>
            <AddMeal />
          </PrivateRoutes>
        ),
      },
      {
        path: "all-meals",
        element: (
          <PrivateRoutes>
            <AllMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <PrivateRoutes>
            <UpdateMeal />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoutes>
            <ManageUsers />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export { router };
