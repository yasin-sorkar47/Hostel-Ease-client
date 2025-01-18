import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import coverImage from "../../../assets/coverImage.jpg";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [] } = useQuery({
    queryKey: ["meal", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/added-meal/${user?.email}`);
      return data;
    },
  });

  const { data: badge = "" } = useQuery({
    queryKey: ["badge", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/subscriptionStatus/${user?.email}`);
      return data.status;
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImage}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user.email}</span>
              </p>
              {role === "admin" ? (
                <p className="flex flex-col">
                  Number of Meal Added
                  <span className="font-bold text-black ">
                    I Added Meals: ({meals?.length})
                  </span>
                </p>
              ) : (
                <p className="flex flex-col">
                  Badge
                  <span className="font-bold text-black ">({badge})</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
