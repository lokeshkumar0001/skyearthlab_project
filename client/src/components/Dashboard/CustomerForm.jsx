import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCustomerContext } from "../../hooks/useCustomerContext";


const CustomerForm = () => {
  const { dispatch } = useAuthContext();

  const {customerDispatch} = useCustomerContext();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    dob: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty required fields
    const requiredFields = ["name", "surname", "age", "dob", "email"];
    const hasEmptyFields = requiredFields.some((field) => !formData[field]);

    // If any required field is empty, prevent form submission
    if (hasEmptyFields) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Make API call to save user data

      const storedUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined;

      if (storedUser.token) {
        setLoading(true);
        const response = await axios.post("/api/customer/new", formData, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
        });

        const { success, message, error } = response.data;
        // Check if the request was successful
        if (success === true) {
          // Show a success notification
          toast.success(message);
          try {
            const res = await axios.get("/api/customer",  {
              headers: {
                Authorization: `Bearer ${storedUser.token}`,
              },
            });
              
            const {success,data} = res.data
            if(success === true){
              customerDispatch({type:'SET_CUSTOMER_INFO',payload:[...data]})
            }

          } catch (error) {
            toast.error("Fetch customer data failed");
          }
          // customerState.dispatch({type:'SET_CUSTOMER_INFO',payload:{'this is test payload'}})
        } else {
          // Show an error notification if the request was not successful
          toast.error(error);
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      // Show an error notification if there is an exception
      toast.error("An error occurred. Please try again.");
      console.error("API call error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h1 className="text-center text-black font-bold text-2xl">Add customer</h1>
        <label className="block mb-2">
          Name:
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-2">
          Surname:
          <input
            className="w-full border p-2 rounded mt-1"
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-2">
          Age:
          <input
            className="w-full border p-2 rounded mt-1"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-2">
          Date of Birth:
          <input
            className="w-full border p-2 rounded mt-1"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            className="w-full border p-2 rounded mt-1"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className={`bg-blue-500 text-white p-2 rounded ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-100 animate-spin dark:text-gray-200 fill-blue-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="ml-2">Creating...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CustomerForm;
