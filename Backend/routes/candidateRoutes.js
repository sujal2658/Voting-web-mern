const express = require("express");
const routes = express.Router();
const Candidate = require("./../models/candidate");
const User = require("./../models/user");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

//create function to check is admin or not

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (error) {
    return false;
  }
};

// post method to tack data from candidate  creTE
routes.post("/create", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user has not admin role" });
    const data = req.body; //asinge the request body contant the parser data

    //create new person document useing new model
    const newCandidate = new Candidate(data);

    // sava the new person to database
    const response = await newCandidate.save();
    console.log("data saved");

    res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error " });
  }
});

//update existin candidate
routes.put("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user has not admin role" });

    const candidateID = req.params.candidateID;
    const updatedcandidata = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedcandidata,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ error: "candidate not found " });
    }
    console.log(" candidate data updataed", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internet server problem" });
  }
});

//delet candidate
routes.delete("/:candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user has not admin role" });

    const candidateID = req.params.candidateID;

    const response = await Candidate.findByIdAndDelete(candidateID);

    if (!response) {
      return res.status(404).json({ error: "candidate not found " });
    }
    console.log(" candidate deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internet server problem" });
  }
});
//voting
routes.get("/vote/:candidateID", jwtAuthMiddleware, async (req, res) => {
  //no admin can vote
  //voter can vote only
  candidateID = req.params.candidateID;
  userId = req.user.id;

  try {
    //find candidate id
    const candidate = await Candidate.findById(candidateID);
    console.log(candidate, "this is id ");
    if (!candidate) {
      return res.status(404).json({ message: "candidate not found" });
    }
    // finde user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    //check  is  admin not give vote
    if (user.role === "admin") {
      return res.status(403).json({ message: "admin cant give vote " });
    }
    //user alredy voted
    if (user.isVoted) {
      return res.status(400).json({ message: "you have alredy voted" });
    }

    // candidate add voter info
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    //update user document is voted
    user.isVoted = true;
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// votes count result

routes.get("/count", async (req, res) => {
  try {
    // Fetch data
    const candidate = await Candidate.find({}, { party: 1, voteCount: 1 }).sort(
      {
        voteCount: "desc",
      }
    );

    // Map and return results
    const voterRecord = candidate.map((data) => ({
      party: data.party,
      count: data.voteCount,
    }));
    console.log("Mapped voter record:", voterRecord);

    return res.status(200).json(voterRecord);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//get list of all candidate
routes.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "name party age _id");

    // res.status(200).json(candidates);
    // console.log(candidates); //check debug
    return res.status(200).json(candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = routes;
