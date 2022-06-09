import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../../features/auth/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    error: "",
    firstName: "",
    lastName: "",
  });

  const from = location.state?.from?.pathname || "/";

  const { status, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    if (formData.firstName === "") {
      setFormData((prev) => ({ ...prev, error: "First name can't be empty." }));
      return false;
    }
    if (formData.lastName === "") {
      setFormData((prev) => ({ ...prev, error: "Last name can't be empty." }));
      return false;
    }
    if (formData.username === "") {
      setFormData((prev) => ({ ...prev, error: "Username can't be empty." }));
      return false;
    }
    if (formData.password.length < 6) {
      setFormData((prev) => ({
        ...prev,
        error: "Password cannot be less than 6 characters.",
      }));
      return false;
    }
    if (formData.password !== formData.password2) {
      setFormData((prev) => ({ ...prev, error: "Passwords do not match." }));
      return false;
    }
    setFormData((prev) => ({ ...prev, error: null }));
    return true;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    if (validateData()) {
      dispatch(signupUser(formData));
    }
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
        <h1 className="text-3xl">Sign Up</h1>
        {formData.error && (
          <p className="p-2 text-red-700 bg-red-200 rounded">
            {formData.error}
          </p>
        )}
        <label>
          <p className="text-[1rem] py-2">First Name</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className="w-full p-2 outline-none border-2 border-blue-500"
            placeholder="Enter your first name"
            onChange={onChange}
          />
        </label>
        <label>
          <p className="text-[1rem] py-2">Last Name</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className="w-full p-2 outline-none border-2 border-blue-500"
            placeholder="Enter your last name"
            onChange={onChange}
          />
        </label>
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
        <label>
          <p className="text-[1rem] py-2">Confirm Your Password</p>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            className="w-full p-2 outline-none border-2 border-blue-500"
            placeholder="Re-enter your password"
            onChange={onChange}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading" && true}
          className="disabled:cursor-not-allowed hover:opacity-80 py-2 px-3 text-[1rem] rounded bg-blue-500 text-white"
          onClick={signupHandler}
        >
          Sign up
        </button>
        <p>
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export { SignupPage };
