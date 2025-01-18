import { Helmet } from "react-helmet";
import AnnouncementsSection from "../announcementsSection/AnnouncementsSection";
import Banner from "../banner/Banner";
import MealsCategories from "../mealsCategories/MealsCategories";
import MembershipSection from "../membershipSection/MembershipSection";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <Helmet>
        <title>HostelEase | Home</title>
      </Helmet>
      <Banner />
      <MealsCategories />
      <AnnouncementsSection />
      <MembershipSection />
    </div>
  );
};

export default HomePage;
