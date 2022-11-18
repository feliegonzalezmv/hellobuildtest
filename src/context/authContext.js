import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, gitUser) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user.uid), { gitUser });
    console.log("Document Added");
  };

  const sendFavorites = async (uid, favorites) => {
    await setDoc(doc(db, "favorites", uid), { items: favorites });
    console.log("Document Added");
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      const { reloadUserInfo } = currentUser || {};
      setUser(reloadUserInfo);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  const getUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  const getFavorites = async (uid) => {
    const docRef = doc(db, "favorites", uid);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        loginWithGitHub,
        user,
        logout,
        loading,
        resetPassword,
        getUserData,
        sendFavorites,
        getFavorites,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
