import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false)
  const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password)=>{
      setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name)=>{
      return updateProfile(auth.currentUser, {displayName: name})
    }

    const googleLoginUser = ()=>{
      setLoading(true)
     return signInWithPopup(auth, googleProvider);
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

    const logoutUser = ()=>{
      setLoading(false)
      return signOut(auth)
    }

    console.log(user)

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    updateUser,
    googleLoginUser,
    logoutUser

  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
