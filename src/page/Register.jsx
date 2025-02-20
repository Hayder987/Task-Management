
import banner from "../assets/images/login.jpg";
import { Link } from "react-router";
import GoogleLogin from "../components/GoogleLogin";

const Register = () => {
  return (
    <div className="bg-slate-100 flex justify-center items-center min-h-[100vh]">
      <div className="container p-4 rounded-lg bg-white flex items-center mx-auto">
        {/* image */}
        <div className="hidden px-20 md:flex md:w-1/2">
          <img src={banner} alt="" className="w-full h-full" />
        </div>
        {/* form */}
        <div className="w-full md:w-1/2 py-10 lg:px-32">
          <h1 className="text-center text-3xl font-semibold mb-8">Sign Up</h1>
          <form className="">
            <div className="px-4 flex flex-col gap-5 ">
              {/* name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              {/* password */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <input
                type="submit"
                value="Register Now"
                className="py-2 rounded-md font-semibold cursor-pointer px-6 bg-blue-800 text-white"
              />
            </div>
          </form>
          <div className="divider my-6">OR</div>
          <GoogleLogin></GoogleLogin>
          <p className="text-center py-4 font-medium">
            Have an Account?{" "}
            <Link to="/login">
              <span className="text-blue-600 underline"> SignIn Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
