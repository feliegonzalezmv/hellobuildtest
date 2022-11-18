import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks";
import { CardComponent } from "./CardComponent";

export function Home() {
  const { logout, user } = useAuth();

  const { data, loading, error } = useFetch(
    `https://api.github.com/users/${user.screenName}/repos`
  );

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  console.log("Current User => ", user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4">welcome {user.displayName || user.email}</p>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      {data?.map((item) => (
        <CardComponent />
      ))}
    </div>
  );
}
