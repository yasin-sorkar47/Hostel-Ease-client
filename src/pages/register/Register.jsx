import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublick";
import imageUpload from "../../utilities/imageUpload";

export default function Register() {
  const { createUser, setLoader, setUser, updateUser, singInWithGoogle } =
    useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setErr(" ");

    // host image to imgbb
    const image = await imageUpload(data.photo);

    if (image.status) {
      // crate a user
      createUser(data.email, data.password)
        .then((result) => {
          // update the user from firebase
          const updateValue = {
            displayName: data.name,
            photoURL: image?.data?.data?.display_url,
          };
          updateUser(updateValue)
            .then(() => {
              console.log(result.user.displayName);

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
              } catch (error) {
                console.log(error);
              }

              setUser(result.user);
              setLoader(false);
              reset();
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setErr("This email has already taken.");
          setUser(null);
        });
    }
  };

  return (
    <div className="hero  min-h-screen">
      <Helmet>
        <title>HostelEase | Register</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold text-center pt-8">Register now!</h1>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { require: true })}
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="file"
              name="photo"
              {...register("photo", { require: true })}
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { require: true })}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              {...register("password", { require: true })}
              placeholder="password"
              className="input input-bordered"
              required
            />
            {err && <p className="text-red-600 ">{err}</p>}
            <label className="label">
              <p className="label-text-alt  ">
                if you have an account please{" "}
                <Link to={"/login"} className="link link-hover font-bold">
                  Login
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <div className="form-control mt-3">
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
}
