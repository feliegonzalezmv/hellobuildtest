import React from "react";
import { useAuth } from "../context/authContext";

export const Home = () => {
  const { user } = useAuth();

  console.log("user :>> ", user);

  return <div>Home</div>;
};
