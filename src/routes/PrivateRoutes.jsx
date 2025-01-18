import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoaderPage from "../pages/loaderPage/LoaderPage";

export default function PrivateRoutes({ children }) {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <LoaderPage />;
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}
