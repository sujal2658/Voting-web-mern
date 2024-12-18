import { useEffect, useState } from "react";
import authService from "../Backend/auth";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
function Profile() {
  const [myData, setMyData] = useState();
  const [error, setError] = useState(); // Track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getprofile();

        console.log("Profile data fetched:", response); // Debug fetched data
        setMyData(response.user);
        console.log(myData);
      } catch (error) {
        // console.error("Error fetching profile:", error); // Debug errors
        setError(error.message); // Set error for display
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error is: {error}</p>; // Display error
  }

  if (!myData) {
    return <p>Loading data...</p>; // Loading state
  }

  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          {/* Circular Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {myData.name[0].toUpperCase()}
          </div>
          <h1 className="text-2xl font-semibold mt-4">My Profile</h1>
  
          {/* Profile Details */}
          <div className="mt-4 w-full">
            <p className="text-gray-700 text-lg font-medium mb-2">Name: <span className="font-normal">{myData.name}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Age: <span className="font-normal">{myData.age}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Email: <span className="font-normal">{myData.email}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Mobile: <span className="font-normal">{myData.mobile}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Address: <span className="font-normal">{myData.address}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Aadhar Card Number: <span className="font-normal">{myData.aadharCardNumber}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Role: <span className="font-normal">{myData.role}</span></p>
            <p className="text-gray-700 text-lg font-medium mb-2">Voted: <span className="font-normal">{myData.isVoted ? "Yes" : "No"}</span></p>
          </div>
        </div>
  
        {/* Change Password Link */}
        <div className="mt-6 w-full max-w-md">
          <NavLink
            to="/changPassword"
            className="block text-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 shadow-md"
          >
            Change your Old Password
          </NavLink>
        </div>
  
        {/* Logout Button */}
        <nav className="mt-4 w-full max-w-md">
          <p 
            className="block w-full text-center px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 transition-all duration-300 shadow-md"
          >
            <Logout/>
          </p>
        </nav>
      </div>
    );
  };
export default Profile;
