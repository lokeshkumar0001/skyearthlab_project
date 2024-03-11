import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (
      !signupForm.username ||
      !signupForm.firstname ||
      !signupForm.lastname ||
      !signupForm.email ||
      !signupForm.password
    ) {
      toast.error("All Fields are required", {
        position: "top-center",
        autoClose: 2000, // 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }

    // Make the signup request
    await signup(
      signupForm.username,
      signupForm.email,
      signupForm.password,
      signupForm.firstname,
      signupForm.lastname
    );

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

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex items-center justify-center">
      <form
        className="w-96 p-4 mx-auto mt-8 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="username"
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
            value={signupForm.username}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstname"
          >
            Firstname:
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="firstname"
            onChange={(e) =>
              setSignupForm({ ...signupForm, firstname: e.target.value })
            }
            value={signupForm.firstname}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Lastname:
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            type="text"
            id="lastname"
            onChange={(e) =>
              setSignupForm({ ...signupForm, lastname: e.target.value })
            }
            value={signupForm.lastname}
          />
        </div>

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
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
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
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        {/* Link to the Login page */}
        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in here
          </Link>
        </div>
      </form>

      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
