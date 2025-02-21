
import useAuth from "../hook/useAuth"
import { Navigate } from "react-router"
import Loader from "../components/Loader"



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()

    if(loading){
        return <Loader></Loader>
    }

    if(user){
        return children
    }

  return <Navigate to='/login'></Navigate>
}

export default PrivateRoute