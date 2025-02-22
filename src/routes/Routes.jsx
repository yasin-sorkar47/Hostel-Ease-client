import { createBrowserRouter } from "react-router-dom";
import Statistics from "../components/Dashboard/Statistics/Statistics";
import DashboardLayout from "../layOuts/DashboardLayout";
import Main from "../layOuts/Main";
import Meals from "../pages/allMeals/Meals";
import Checkout from "../pages/checkout/Checkout";
import AddMeal from "../pages/dashboard/admin/addMeal/AddMeal";
import AllMeals from "../pages/dashboard/admin/allMeals/AllMeals";
import AllReview from "../pages/dashboard/admin/allReviews/AllReviews";
import ManageUsers from "../pages/dashboard/admin/manageUsers/ManageUsers";
import ServeMeals from "../pages/dashboard/admin/serveMeals/ServeMeals";
import UpcomingMeals from "../pages/dashboard/admin/upcomingMeals/UpcomingMeals";
import UpdateMeal from "../pages/dashboard/admin/updateMeal/UpdateMeal";
import Profile from "../pages/dashboard/common/Profile";
import MyReviews from "../pages/dashboard/user/myReviews/MyReviews";
import UpdateReviews from "../pages/dashboard/user/myReviews/UpdateReviews";
import PaymentHistory from "../pages/dashboard/user/paymentHistory/PaymentHistory";
import RequestedMeals from "../pages/dashboard/user/requestedMeals/RequestedMeals";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import MealDetails from "../pages/mealDetails/MealDetails";
import NotFound from "../pages/notFound/NotFound";
import Register from "../pages/register/Register";
import AllUpcomingMeals from "../pages/upcomingMeals/AllUpcomingMeals";
import AdminRoute from "./AdminRoute";
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
        path: "checkout/:badge",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "upcomingMeals",
        element: <AllUpcomingMeals />,
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
            <Statistics />
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

      // admin relate routes
      {
        path: "add-meal",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AddMeal />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "all-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AllMeals />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <UpdateMeal />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <AllReview />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ServeMeals />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },

      {
        path: "upcoming-meals",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <UpcomingMeals />
            </AdminRoute>
          </PrivateRoutes>
        ),
      },

      // user related routes
      {
        path: "requested-meals",
        element: (
          <PrivateRoutes>
            <RequestedMeals />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoutes>
            <MyReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-reviews/edit/:id",
        element: (
          <PrivateRoutes>
            <UpdateReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoutes>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export { router };
