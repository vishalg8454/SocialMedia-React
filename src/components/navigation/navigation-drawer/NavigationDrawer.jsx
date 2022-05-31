import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";

const NavigationDrawer = () => {
  return (
    <div className="sticky top-[5rem] m-4 ml-8 flex flex-col gap-1 text-slate-700">
      <NavLink
        to=""
        className={({ isActive }) => (isActive ? "bg-blue-500 text-white" : "")}
      >
        <div className="hover:bg-blue-500 hover:text-white p-2 rounded-sm">
          <HomeRoundedIcon sx={{ fontSize: 32 }} />
          <span className="ml-2">Home</span>
        </div>
      </NavLink>
      <NavLink
        to="explore"
        className={({ isActive }) => (isActive ? "bg-blue-500 text-white" : "")}
      >
        <div className="hover:bg-blue-500 hover:text-white p-2 rounded-sm">
          <ExploreIcon sx={{ fontSize: 32 }} />
          <span className="ml-2">Explore</span>
        </div>
      </NavLink>
      <NavLink
        to="bookmark"
        className={({ isActive }) => (isActive ? "bg-blue-500 text-white" : "")}
      >
        <div className="hover:bg-blue-500 hover:text-white p-2 rounded-sm">
          <BookmarkIcon sx={{ fontSize: 32 }} />
          <span className="ml-2">Bookmark</span>
        </div>
      </NavLink>
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? "bg-blue-500 text-white" : "")}
      >
        <div className="hover:bg-blue-500 hover:text-white p-2 rounded-sm">
          <PersonIcon sx={{ fontSize: 32 }} />
          <span className="ml-2">Profile</span>
        </div>
      </NavLink>
    </div>
  );
};

export { NavigationDrawer };
