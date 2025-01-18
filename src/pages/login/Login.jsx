import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { singInUser, singInWithGoogle, setUser, setLoader } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setErr(null);
    //   // singIn
    singInUser(data.email, data.password)
      .then((result) => {
        setLoader(false);
        reset();
        navigate(from);
      })
      .catch((error) => {
        setErr("invalid password or email.");
      });
  };

  return (
    <div className="hero  min-h-screen">
      <Helmet>
        <title>HostelEase | Login</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
        <h1 className="text-5xl font-bold text-center pt-8">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              {...register("email", { required: true })}
              type="email"
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
              name="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
              className="input input-bordered"
              required
            />
            {err && <p className="text-red-500">{err}</p>}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>

            <label className="label">
              <p className="label-text-alt  ">
                If you don't have an account please{" "}
                <Link to={"/register"} className="link link-hover font-bold">
                  Register
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <div className="form-control mt-3">
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>
  );
}
