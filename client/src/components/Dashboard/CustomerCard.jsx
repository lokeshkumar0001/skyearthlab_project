// CustomerCard.jsx

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCustomerContext } from "../../hooks/useCustomerContext";

const CustomerCard = ({ customer }) => {
  const {customerDispatch} = useCustomerContext();

  const { _id, name, surname, email, age, dob } = customer;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedSurname, setEditedSurname] = useState(surname);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedAge, setEditedAge] = useState(age);
  const [editedDob, setEditedDob] = useState(formatDate(dob));
  const [loading, setLoading] = useState(false);


  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      const storedUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
      if (storedUser.token) {
        setLoading(true)
        const token = storedUser.token; // Replace with your actual Bearer token

        const response = await axios.put(
          `api/customer/${_id}`,
          {
            name: editedName,
            surname: editedSurname,
            email: editedEmail,
            age: editedAge,
            dob: editedDob,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, message, error } = response.data;
          
        if(success){
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
        }else{
          toast.error(error);
        }
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving customer data:", error);
    }finally{
      setLoading(false)
    }
  };

  const onDelete = async (id) => {
     try {
      const storedUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined;
      if (storedUser.token) {
        const token = storedUser.token; // Replace with your actual Bearer token

        const response = await axios.delete(
          `api/customer/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, message, error } = response.data;
          
        if(success){
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
        }else{
            console.log(error);
        }
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving customer data:", error);
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md mb-4">
      {isEditing ? (
        <>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Name:
            </label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Surname:
            </label>
            <input
              type="text"
              value={editedSurname}
              onChange={(e) => setEditedSurname(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Email:
            </label>
            <input
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Age:
            </label>
            <input
              type="number"
              value={editedAge}
              onChange={(e) => setEditedAge(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Date of Birth:
            </label>
            <input
              type="date"
              value={editedDob}
              onChange={(e) => setEditedDob(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">{`${name} ${surname}`}</h2>
          <p className="text-gray-600">{`Email: ${email}`}</p>
          <p className="text-gray-600">{`Age: ${age}`}</p>
          <p className="text-gray-600">{`Date of Birth: ${formatDate(dob)}`}</p>
          <div className="flex mt-4">
            
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
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
                <span className="ml-2">Saving...</span>
              </div>
                ):("Edit")}
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerCard;
