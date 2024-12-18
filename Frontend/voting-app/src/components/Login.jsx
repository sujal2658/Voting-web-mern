import { useState } from "react";
import authService from "../Backend/auth";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    aadharCardNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(formData);
      alert("Login successful!", response);
      navigate("/home");
      // Navigate to a dashboard or other protected route
    } catch (err) {
      setError(err.message || "Invalid Aadhar Card Number or Password.");
    }
  };

  return (
    

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-form w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && (
          <div className="error text-red-500 text-sm mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="aadharCardNumber"
            type="text"
            placeholder="Aadhar Card Number"
            value={formData.aadharCardNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </NavLink>
        </p>
      </div>
    </div>
  

  );
};

export default Login;
