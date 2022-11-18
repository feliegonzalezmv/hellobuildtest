import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks";
import { CardComponent } from "../components";

export function Home() {
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState(null);
  const { logout, user, getUserData, sendFavorites, getFavorites } = useAuth();

  const { data, loading } = useFetch(
    `https://api.github.com/users/${userData?.gitUser || user.screenName}/repos`
  );

  useEffect(() => {}, [data]);

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

  useEffect(() => {
    const getFavoritesRepos = async () => {
      const userInfo = await getFavorites(user.localId);
      if (userInfo.exists()) {
        setFavorites(userInfo.data().items);
      }
    };
    if (user) getFavoritesRepos();
  }, [user, getFavorites]);

  const moveToFavorites = async (id) => {
    let copyFavorites = [...favorites];
    const currentItem = data.find((item) => item.id === id);
    const isDuplicatedItem = favorites?.find(
      (item) => item.id === currentItem.id
    );

    console.log("isDuplicatedItem :>> ", isDuplicatedItem);
    if (isDuplicatedItem) {
      copyFavorites = favorites.filter((item) => item.id !== currentItem.id);
      setFavorites(copyFavorites);
    } else {
      copyFavorites = [...favorites, currentItem];
      setFavorites(copyFavorites);
    }

    console.log("favorites", copyFavorites);

    await sendFavorites(user.localId, copyFavorites);
  };

  return (
    <>
      <div className="p-10 flex  justify-between">
        <h1 className="mb-10 font-bold text-2xl">
          <p>Welcome {user.displayName || user.email}</p>
        </h1>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!data && !loading ? (
        <p>Not found repositories for this user try to sign with gitHub</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pb-20">
          {data?.map((item) => (
            <CardComponent
              key={`${item.id}`}
              item={item}
              handleAddFavorite={moveToFavorites}
              isFavorite={
                !!favorites?.find((favoriteItem) => favoriteItem.id === item.id)
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
