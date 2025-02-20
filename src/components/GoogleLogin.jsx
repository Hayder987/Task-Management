import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <div>
      <button className="flex justify-center border-gray-300 border-2 gap-3 items-center py-2 w-full px-4 rounded-full">
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className=" font-semibold cursor-pointer">Login With Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;
