import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublick";

export default function SocialLogin() {
  const { setLoader, setUser, singInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSingIngWithGoogle = () => {
    singInWithGoogle()
      .then((result) => {
        // send data to data base
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          status: "bronze",
          role: "user",
        };
        try {
          axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);

            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have successfully logIn!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

          setUser(result.user);
          setLoader(false);
          navigate(from);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      });
  };

  return (
    <button
      onClick={handleSingIngWithGoogle}
      type="button"
      className="btn btn-success text-white"
    >
      <FaGoogle />
      Login with Google
    </button>
  );
}
