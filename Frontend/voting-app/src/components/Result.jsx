import  { useState, useEffect } from "react";
import candidateService from "../Backend/config";
const Result = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch candidates ordered by votes
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateService.candidateVotesCount(); // Assuming this API returns candidates sorted by votes
        setCandidates(response); // Assuming response contains a `data` array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch results.", err);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}, this is error </p>;

  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Election Results</h1>
      <div className="flex flex-col items-center gap-6 mt-6">
        {candidates.map((candidate, index) => (
          <div
            key={candidate._id || index}
            className={`w-full max-w-lg p-6 rounded-lg shadow-lg ${
              index === 0
                ? "bg-yellow-300 border-yellow-500"
                : index === 1
                ? "bg-gray-300 border-gray-500"
                : index === 2
                ? "bg-orange-300 border-orange-500"
                : "bg-white border-gray-200"
            } border-2`}
          >
            <h2 className="text-xl font-semibold text-gray-700">Rank #{index + 1}:</h2>
            <p className="text-lg mt-2">
              <strong className="font-bold">Party:</strong> {candidate.party}
            </p>
            <p className="text-2xl font-semibold text-blue-600 mt-4">
              Votes: {candidate.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
