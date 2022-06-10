import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";

const NavigationBottom = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div
      className="h-16 text-blue-700 bg-white flex dark:bg-slate-800
     justify-around items-center"
    >
      <NavLink
        to=""
        className={({ isActive }) =>
          isActive ? "dark:text-blue-700 text-blue-500" : "text-slate-700"
        }
      >
        <HomeRoundedIcon sx={{ fontSize: 32 }} />
      </NavLink>
      <NavLink
        to="explore"
        className={({ isActive }) =>
          isActive ? "dark:text-blue-700 text-blue-500" : "text-slate-700"
        }
      >
        <ExploreIcon sx={{ fontSize: 32 }} />
      </NavLink>
      <NavLink
        to="bookmark"
        className={({ isActive }) =>
          isActive ? "dark:text-blue-700 text-blue-500" : "text-slate-700"
        }
      >
        <BookmarkIcon sx={{ fontSize: 32 }} />
      </NavLink>
      <NavLink
        to={`profile/${user.username}`}
        className={({ isActive }) =>
          isActive ? "dark:text-blue-700 text-blue-500" : "text-slate-700"
        }
      >
        <PersonIcon sx={{ fontSize: 32 }} />
      </NavLink>
    </div>
  );
};

export { NavigationBottom };
