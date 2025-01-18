import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoaderPage from "../pages/loaderPage/LoaderPage";

export default function AdminRoute({ children }) {
  const [role, isLoading] = useRole();
  const { user, loader } = useAuth();

  if (loader) {
    return <LoaderPage />;
  }

  if (isLoading) {
    return <LoaderPage />;
  }

  if (user && role === "admin") {
    return children;
  }
  return <Navigate to={"/"} replace></Navigate>;
}
