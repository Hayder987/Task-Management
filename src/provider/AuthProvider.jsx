import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false)

    const registerUser = ()=>{

    }

  const authInfo = {
    user,
    loading
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
