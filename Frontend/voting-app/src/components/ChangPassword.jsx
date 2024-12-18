import  { useState } from "react";
import authService from "../Backend/auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await authService.updatePassword(data);
      alert("Password change successful!", response);
      navigate("/profile")
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred.");
    }
  };

  if (err) {
    return <p>Error: {err}</p>; // Display error
  }

 
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Change Password</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={data.currentPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={data.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-md transition duration-300"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
