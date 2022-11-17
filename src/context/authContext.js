import { createContext } from "react";
import { useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("There is not auth provider");
  }
  return context;
};

const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export function AuthProvider({ children }) {
  return (
    <authContext.Provider value={{ signUp }}>{children}</authContext.Provider>
  );
}
