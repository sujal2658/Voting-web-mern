import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ChangPassword from "./components/ChangPassword";
import Admin from "./components/Admin";
import AddCandidate from "./components/AddCandidate";
import VotingList from "./components/VotingList";
import Result from "./components/Result";
import Layout from "./components/pages/Layout";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route index element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changPassword" element={<ChangPassword />} />
            <Route path="/addcandidate" element={<AddCandidate />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/voting-list" element={<VotingList />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
