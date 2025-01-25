import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublick";
import AnnouncementsSection from "../announcementsSection/AnnouncementsSection";
import Banner from "../banner/Banner";
import MealsCategories from "../mealsCategories/MealsCategories";
import MembershipSection from "../membershipSection/MembershipSection";

const HomePage = () => {
  const [value, setValue] = useState("");

  const axiosPublic = useAxiosPublic();

  const { data: meals = [] } = useQuery({
    queryKey: ["meals", value],
    queryFn: async () => {
      const { data } = await axiosPublic(`/meals?search=${value}`);
      return data;
    },
  });

  const handleSearch = (value) => {
    setValue(value);
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>HostelEase | Home</title>
      </Helmet>
      <Banner handleSearch={handleSearch} />
      <MealsCategories meals={meals} />
      <AnnouncementsSection />
      <MembershipSection />
    </div>
  );
};

export default HomePage;
