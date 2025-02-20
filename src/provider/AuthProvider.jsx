import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false)

    const registerUser = (email, password)=>{
      setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
     const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
     })

     return ()=>{
      unSubscribe()
     }
    }, []);

    console.log(user)

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser

  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
