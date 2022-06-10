import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = ({ profileImage, firstName, lastName, username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <div className="flex flex-col dark:bg-slate-800 dark:text-white">
        <img className="h-16 w-16 rounded" src={profileImage} />
        <div className="mt-2 text-center">{firstName}</div>
        <div className="-mt-2 text-center">{lastName}</div>
      </div>
    </Link>
  );
};
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { users } = useSelector((state) => state.user);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    let filteredUsers = users?.filter(
      (user) =>
        user.firstName.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
    setUsersList(filteredUsers);
  }, [searchText]);

  return (
    <div className="">
      <div className="flex rounded relative">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-1 pl-4 outline-none rounded-l dark:bg-slate-600"
          placeholder="Search for People..."
        />
        <button className=" rounded-r p-2 border-blue-400 bg-blue-200 hover:opacity-75">
          <SearchIcon />
        </button>
      </div>
      <div
        className={`${
          searchText.length === 0 ? "hidden" : "block"
        } w-full z-[11111] h-30 bg-white absolute flex items-center p-4 gap-4
        border-2 border-blue-500 dark:bg-slate-800`}
      >
        {usersList.map(({ profileImage, firstName, lastName, username }) => (
          <UserProfile
            key={username}
            profileImage={profileImage}
            firstName={firstName}
            lastName={lastName}
            username={username}
          />
        ))}
        {usersList.length === 0 &&<p className="dark:text-white">No matching users found</p>}
      </div>
    </div>
  );
};

export { SearchBar };
