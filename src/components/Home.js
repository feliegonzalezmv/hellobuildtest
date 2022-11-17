import React from "react";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user } = useAuth();
  console.log(user);

  return <div>Hello world </div>;
};
