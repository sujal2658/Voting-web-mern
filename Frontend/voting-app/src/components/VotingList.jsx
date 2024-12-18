import { useState, useEffect } from "react";
import candidateService from "../Backend/config";
import {useNavigate } from "react-router-dom";
const VotingList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all candidates on component load
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateService.getAllCandidate();
        setCandidates(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch candidates.", err);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Handle voting
  const handleVote = async (candidateID) => {
    try {
      await candidateService.votingCandidate(candidateID);
      alert("voted successfully");
    } catch (err) {
      alert("you have alredy Voted ",err);
      navigate("/home");
      // setError("Failed to vote. You may have already voted.", err);  
    }
    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap gap-8 justify-center p-4 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          className="border border-gray-200 rounded-lg w-80 p-6 text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
        >
          {/* candidate Name in Round Box  */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto flex items-center justify-center text-xl font-extrabold text-white shadow-inner">
            {candidate.name[0].toUpperCase()}
          </div>
          <h3 className="text-2xl font-bold mt-4 text-gray-800">
            {candidate.name}
          </h3>
          <p className="text-gray-700 mt-2 text-sm">
            Party:{" "}
            <span className="font-medium text-gray-900">{candidate.party}</span>
          </p>
          {/* <p className="text-gray-700 text-sm">Age: <span className="font-medium text-gray-900">{candidate.age}</span></p> */}
          <button
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300"
            onClick={() => handleVote(candidate._id)}
          >
            Vote Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default VotingList;
