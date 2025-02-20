import { FcGoogle } from "react-icons/fc";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { googleLoginUser } = useAuth();
  const navigate = useNavigate()

  const googleLoginHandler = async () => {
    try {
      await googleLoginUser()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/task");
    } catch (err) {
      Swal.fire(`${err?.message}`);
    }
  };

  return (
    <div>
      <button
        onClick={googleLoginHandler}
        className="flex justify-center border-gray-300 border-2 gap-3 items-center py-2 w-full px-4 rounded-full"
      >
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className=" font-semibold cursor-pointer">Login With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
