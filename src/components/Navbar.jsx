import { LuLogOut } from "react-icons/lu"
import useAuth from "../hook/useAuth"
import { useNavigate } from "react-router"


const Navbar = () => {
  const {user, logoutUser} = useAuth()
  const navigate = useNavigate()

  return (
    <div className=" flex justify-between items-center px-6 py-4">
       <div className="">
        <h1 className="font-bold text-4xl">Task <span className="text-blue-800">Flow</span></h1>
       </div>
       {/* user */}
       <div className="flex items-center gap-3 border p-1 border-gray-200 rounded-md">
          <div className="">
            {
              user?.photoURL?
              <img referrerPolicy="no-referrer" src={`${user?.photoURL}`} alt="" className="w-12 h-12 rounded-full" />:
              <div className="w-12 h-12 font-semibold bg-blue-200 rounded-full p-4 flex justify-center items-center">
                <h1 className="text-blue-800 text-2xl">{user?.displayName.slice(0,2).toUpperCase()}</h1>
              </div>
            }
          </div>
          <button
          onClick={async()=>{
           await logoutUser()
           navigate('/')
          }}
           className="text-4xl text-blue-800 cursor-pointer"><LuLogOut /></button>
       </div>
    </div>
  )
}

export default Navbar