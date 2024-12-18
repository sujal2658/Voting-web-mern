import { useState, useEffect } from "react";
import candidateService from "../Backend/config";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../Backend/auth";


const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", party: "", age: "" });
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Fetch user role and ensure only admin can access
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await authService.getprofile();
        setUserRole(response.user.role);
        if (response.user.role !== "admin") {
          // Redirect to a different page if the user is not an admin
          alert("Only Admin Can Acces")
          navigate("/home");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
      }
    };

    fetchUserRole();
  }, [navigate]);

  // Fetch candidates on component load
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateService.getAllCandidate();
        setCandidates(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch candidates.",err);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (candidateID) => {
    try {
      await candidateService.deletCandidate(candidateID);
      setCandidates((prev) =>
        prev.filter((candidate) => candidate._id !== candidateID)
      );
    } catch (err) {
      setError("Failed to delete candidate.",err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await candidateService.updateCandidate(editForm, editingCandidate._id);
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === editingCandidate._id
            ? { ...candidate, ...editForm }
            : candidate
        )
      );
      setEditingCandidate(null);
      setEditForm({ name: "", party: "", age: "" });
    } catch (err) {
      setError("Failed to update candidate.",err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Candidate List</h1>
      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white"
        >
          <h3 className="text-xl font-semibold">{candidate.name}</h3>
          <p className="text-gray-700">Party: {candidate.party}</p>
          <p className="text-gray-700">Age: {candidate.age}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleDelete(candidate._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setEditingCandidate(candidate)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {editingCandidate && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Edit Candidate</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Name:</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder={editingCandidate.name}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Party:</label>
              <input
                type="text"
                value={editForm.party}
                onChange={(e) =>
                  setEditForm({ ...editForm, party: e.target.value })
                }
                placeholder={editingCandidate.party}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Age:</label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) =>
                  setEditForm({ ...editForm, age: e.target.value })
                }
                placeholder={editingCandidate.age}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingCandidate(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <h3 className="mt-6 text-lg">
        <NavLink
          to="/addcandidate"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          CREATE NEW CANDIDATE
        </NavLink>
      </h3>
    </div>
  );
};

export default Admin;
