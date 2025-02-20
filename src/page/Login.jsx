import { Link, useNavigate } from "react-router";
import GoogleLogin from "../components/GoogleLogin";
import banner from "../assets/images/login2.jpg";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import { FaArrowLeftLong } from "react-icons/fa6";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      navigate("/task");
    } catch (err) {
      Swal.fire(`${err?.message}`);
    }
  };

  return (
    <div className="bg-slate-100 flex justify-center items-center min-h-[100vh]">
      <div className="container p-4 rounded-lg bg-white mx-auto">
        <Link to='/'>
          <p className="flex items-center gap-2 px-4 cursor-pointer py-2">
            <span className="">
              <FaArrowLeftLong />
            </span>
            <span className="">Back to Home</span>
          </p>
        </Link>
        <div className="flex items-center">
          {/* image */}
          <div className="hidden px-20 md:flex md:w-1/2">
            <img src={banner} alt="" className="w-full h-full" />
          </div>
          {/* form */}
          <div className="w-full md:w-1/2 py-10 lg:px-32">
            <h1 className="text-center text-3xl font-semibold mb-8">Sign In</h1>
            <form onSubmit={handleSubmit} className="">
              <div className="px-4 flex flex-col gap-5 ">
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
                  value="Login Now"
                  className="py-2 rounded-md font-semibold cursor-pointer px-6 bg-blue-800 text-white"
                />
              </div>
            </form>
            <div className="divider my-6">OR</div>
            <GoogleLogin></GoogleLogin>
            <p className="text-center py-4 font-medium">
              Don't Have Account?{" "}
              <Link to="/register">
                <span className="text-blue-600 underline"> Register Now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
