import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: "",
  });

  const { status, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    if (formData.username === "") {
      setFormData((prev) => ({ ...prev, error: "Username can't be empty." }));
      return false;
    }
    if (formData.password === "") {
      setFormData((prev) => ({
        ...prev,
        error: "Password field can't be empty.",
      }));
      return false;
    }
    return true;
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    if (validateData()) {
      dispatch(loginUser(formData));
    }
  };

  const fillGuestCredentials = (e) => {
    e.preventDefault();
    setFormData({
      username: "vishalg8454",
      password: "secretpassword",
      error: "",
    });
  };

  return (
    <div className=" bg-blue-100 w-screen h-screen flex justify-center items-center">
      <form className="max-w-md flex flex-col rounded gap-4 m-4 p-6 grow bg-white">
        <div className="flex items-center justify-center">
          <Link to="/">
            <span className="text-[2rem] text-blue-500 font-bold italic">
              Stalk-Me
            </span>
          </Link>
        </div>
        <h1 className="text-3xl">Log In</h1>
        {formData.error && (
          <p className="p-2 text-red-700 bg-red-200 rounded">
            {formData.error}
          </p>
        )}
        <label>
          <p className="text-[1rem] py-2">Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            className="w-full p-2 outline-none border-2 border-blue-500"
            placeholder="Enter your username"
            onChange={onChange}
          />
        </label>
        <label>
          <p className="text-[1rem] py-2">Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full p-2 outline-none border-2 border-blue-500"
            placeholder="Enter your password"
            onChange={onChange}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading" && true}
          className="disabled:cursor-not-allowed hover:opacity-80 py-2 px-3 text-[1rem] rounded bg-blue-500 text-white"
          onClick={LoginHandler}
        >
          Log In
        </button>
        <button
          type="submit"
          disabled={status === "loading" && true}
          className="hover:opacity-80 py-2 px-3 text-[1rem] rounded border-2 border-blue-500 text-blue-500"
          onClick={fillGuestCredentials}
        >
          Use Guest Credentials
        </button>
      </form>
    </div>
  );
};

export { LoginPage };
