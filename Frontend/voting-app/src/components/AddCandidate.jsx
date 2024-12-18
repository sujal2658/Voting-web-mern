import { useState } from "react";
import candidateService from "../Backend/config";
import { useNavigate } from "react-router-dom";



function AddCandidate() {
  const [data, setdata] = useState({
    name: "",
    party: "",
    age: "",
  });
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const navigate = useNavigate();





  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsuccess("");

    try {
      const response = await candidateService.createCandidate(data);
      
      setsuccess("respon submited successfully", response);
      setdata({
        name: "",
        party: "",
        age: "",
      });
      alert("New Candidate added", success);
      navigate("/admin");
    } catch (error) {
      console.log(error, " this is not submit");
      alert("Voter can't create Candidate! ");
      seterror(" code erro ", error);
    }
  };

  if (error) {
    return <p>error cant create candidate server error </p>
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Create Candidate
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              required
              className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-0 text-base text-gray-600 transition-all duration-300 ease-in-out transform origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:top-0"
            >
              Candidate Name
            </label>
          </div>

          {/* Party Field */}
          <div className="relative">
            <input
              type="text"
              name="party"
              id="party"
              value={data.party}
              onChange={handleChange}
              required
              className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <label
              htmlFor="party"
              className="absolute left-4 top-0 text-base text-gray-600 transition-all duration-300 ease-in-out transform origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:top-0"
            >
              Party
            </label>
          </div>

          {/* Age Field */}
          <div className="relative">
            <input
              type="number"
              name="age"
              id="age"
              value={data.age}
              onChange={handleChange}
              required
              className="peer w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <label
              htmlFor="age"
              className="absolute left-4 top-0 text-base text-gray-600 transition-all duration-300 ease-in-out transform origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:top-0"
            >
              Age
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};





export default AddCandidate;
