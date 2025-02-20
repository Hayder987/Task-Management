import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const useAuth = () => {
    const AuthData = useContext(AuthContext)
  return AuthData
}

export default useAuth