import React, { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import axios from 'axios'

const UserProfileCard = () => {
  const { userData,loadingUser, dispatch } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const handleEdit = () => {
    setEditedUser({ ...userData });
    setEditMode(true);
  };

//   if(!loadingUser){
//     console.log(userData);
//   }
  
  const handleSave = async () => {
    // console.log(editedUser);
    try {
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined;
        dispatch({type:"USER_DATA_REQUESTED"})
      if(storedUser.token){
        const res = await axios.put('/api/user/me',editedUser, {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          });
          const {updatedUser} = res.data;
          console.log("success:",updatedUser)
          dispatch({type:"USER_UPDATE",payload:updatedUser})
          dispatch({type:"USER_LOADING_COMPLETE"})
          if(!loadingUser){

              setEditMode(false);
            //   setEditedUser()
          }
      }
      

    //   const data = await response.json();
    //   console.log("Edit API Response:", data);

    } catch (error) {
      console.error("Error editing user:", error);
    }


  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (!loadingUser &&
    ( <div className="w-[400px] mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <div className="p-6 ">
        <h2 className="text-2xl font-bold mb-4 uppercase">
          {/* Display both firstname and lastname */}
          {`${userData.firstName || "First Name"} ${userData.lastName || "Last Name"}`}
        </h2>

        {editMode ? (
          <>
            <div className="mb-4">
              <label htmlFor="editedFirstname" className="text-gray-600">
                First Name:
              </label>
              <input
                type="text"
                id="editedFirstname"
                name="firstName"
                value={editedUser.firstName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="editedLastname" className="text-gray-600">
                Last Name:
              </label>
              <input
                type="text"
                id="editedLastname"
                name="lastName"
                value={editedUser.lastName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="editedAge" className="text-gray-600">
                Age:
              </label>
              <input
                type="number"
                id="editedAge"
                name="age"
                value={editedUser.age || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="editedDob" className="text-gray-600">
                Date of Birth:
              </label>
              <input
                type="date"
                id="editedDob"
                name="dob"
                value={editedUser.dob || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="mr-2 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="text-gray-500 hover:underline focus:outline-none"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <span className="text-gray-600">Age:</span> {userData.age || 'NA'}
            </div>

            <div className="mb-4">
              <span className="text-gray-600">Date of Birth:</span> {userData.dob || "NA"}
            </div>

            <div className="mb-4">
              <span className="text-gray-600">Email:</span> {userData.email}
            </div>

            {!userData.age && !userData.dob && !userData.email && (
              <p className="text-gray-500">No additional information available</p>
            )}

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
              onClick={handleEdit}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>)
  );
};

export default UserProfileCard;
