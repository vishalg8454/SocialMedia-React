import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 z-50 bg-white flex items-center">
      <Link to="">
        <span className="ml-6 text-[2rem] text-blue-500">Social Media</span>
      </Link>
      <button className="ml-auto mr-4 hover:text-slate-700">
        <LightModeIcon sx={{ fontSize: 32 }} />
      </button>
    </div>
  );
};

export { Navbar };
