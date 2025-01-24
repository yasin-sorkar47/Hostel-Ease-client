import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../context";
import { auth } from "../firebase/firebase.init";
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  //   create user
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   singOut user
  const singOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  //   singin user
  const singInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   update user
  const updateUser = (objInfo) => {
    setLoader(true);
    return updateProfile(auth.currentUser, objInfo);
  };

  const singInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   to get current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email;
        try {
          axios
            .post(
              "https://education-services-server-a-10.vercel.app/jwt",
              { email },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res.data);
              setLoader(false);
              setUser(currentUser);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          axios
            .get("https://education-services-server-a-10.vercel.app/logout", {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data);
              console.log("user is logged out");
              setLoader(false);
              setUser(null);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loader,
    setLoader,
    createUser,
    singInUser,
    singOutUser,
    updateUser,
    singInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
