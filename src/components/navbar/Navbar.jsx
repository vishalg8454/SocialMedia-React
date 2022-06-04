import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="h-16 z-50 bg-white flex items-center">
      <Link to="">
        <span className="ml-6 text-[2rem] text-blue-500 font-bold italic">
          Stalk-Me
        </span>
      </Link>
      {token ? (
        <button className="rounded ml-auto border-4 border-blue-500 p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white">
          Logout
        </button>
      ) : (
        <button className="rounded ml-auto border-4 border-blue-500 p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white">
          Login
        </button>
      )}

      <button className="ml-4 mr-4 hover:text-slate-500 rounded">
        <LightModeIcon sx={{ fontSize: 32 }} />
      </button>
    </div>
  );
};

export { Navbar };
