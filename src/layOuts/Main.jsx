import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/footer/Footer";
import Header from "../pages/shared/navbar/Header";

export default function Main() {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
