import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="h-16 z-50 dark:bg-slate-800 bg-white flex items-center">
      <Link to="">
        <span className="ml-6 text-[2rem] dark:text-blue-700 text-blue-500 font-bold italic">
          Stalk-Me
        </span>
      </Link>
      {token ? (
        <button
          onClick={() => dispatch(logout())}
          className="rounded ml-auto border-4 dark:border-blue-700 dark:bg-blue-700 border-blue-500 p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="rounded ml-auto border-4 dark:border-blue-700 dark:bg-blue-700 border-blue-500 p-1 px-4 mr-2 hover:opacity-75 bg-blue-500 text-white"
        >
          Login
        </button>
      )}

      {darkMode && (
        <button
          className="ml-4 mr-4 hover:text-yellow-300 rounded text-yellow-400"
          onClick={() => {
            toggleDarkMode((t) => !t);
          }}
        >
          <LightModeIcon sx={{ fontSize: 32 }} />
        </button>
      )}
      {!darkMode && (
        <button
          className="ml-4 mr-4 hover:text-slate-500 rounded"
          onClick={() => {
            toggleDarkMode((t) => !t);
          }}
        >
          <DarkModeIcon sx={{ fontSize: 32 }} />
        </button>
      )}
    </div>
  );
};

export { Navbar };
