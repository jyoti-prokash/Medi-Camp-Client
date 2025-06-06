import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.init';
import useAxiosPublic from '../Hooks/useAxiosPublic';
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  // login with gmail
   const googleProvider = new GoogleAuthProvider();
   const googleLogin = () => {
     setLoading(true);
     return signInWithPopup(auth, googleProvider);
   };
  
  // create newUser email pass
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // update profile data
  const updateUserProfile = (name,photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    });
  };
  // signIn user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logOut user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // current state user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
          }
        })
      }
      else{
          localStorage.removeItem('access-token')
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    logOut,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;