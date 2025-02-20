import { FadeLoader } from "react-spinners"
import useAuth from "../hook/useAuth"
import { Navigate } from "react-router"



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()

    if(loading){
        return <div className="p-12 flex justify-center"><FadeLoader color={'#0000FF'} /></div>
    }

    if(user){
        return children
    }

  return <Navigate to='/login'></Navigate>
}

export default PrivateRoute