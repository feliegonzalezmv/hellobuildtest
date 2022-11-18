import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks";
import { CardComponent } from "./CardComponent";

export function Home() {
  const [userData, setUserData] = useState(null);
  const { logout, user, getUserData } = useAuth();

  const { data, loading } = useFetch(
    `https://api.github.com/users/${userData?.gitUser || user.screenName}/repos`
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

  useEffect(() => {
    const getUserExtraInfo = async () => {
      const userInfo = await getUserData(user.localId);
      if (userInfo.exists()) {
        setUserData(userInfo.data());
      }
    };
    if (user) getUserExtraInfo();
  }, [user, getUserData]);

  return (
    <>
      <div className="pt-10">
        <h1 className="mb-10 font-bold text-2xl flex space-x-16">
          <p>Welcome {user.displayName || user.email}</p>
          <button
            className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
            onClick={handleLogout}
          >
            logout
          </button>
        </h1>
      </div>

      {loading && <p>Loading...</p>}

      {!data && !loading ? (
        <p>Not found repositories for this user try to sign with gitHub</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pb-20">
          {data?.map((item) => (
            <CardComponent item={item} />
          ))}
        </div>
      )}
    </>
  );
}
