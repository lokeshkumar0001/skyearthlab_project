import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { login, error, isLoading } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);

    // Show notification if there's an error
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000, // 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // useEffect(()=> {
  //   if(!loading && user){
  //     navigate('/dashboard')
  //   }
  // },[loading,user,navigate])

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex items-center justify-center">
      <form
        className="w-96 p-4 mx-auto mt-8 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold mb-4">Log In</h3>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email address:
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            value={loginForm.email}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            value={loginForm.password}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        {/* Link to the Register page */}
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Register here
          </Link>
        </div>
      </form>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
