const express = require("express");
const routes = express.Router();

const User = require("./../models/user");
const { generateToken, jwtAuthMiddleware } = require("./../jwt");

// post method to tack data from user  creTE
routes.post("/signup", async (req, res) => {
  try {
    const data = req.body; //asinge the request body contant the parser data

    //check if alaredy admin user
    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === adminUser) {
      return res.status(400).json({ error: "adminuser is alredy exiest" });
    }

    //validation aadhar card number must must have 12 digits
    // if (!/^\d{12}$.test(data.aadharCardNumber)) {
    //   return res.status(400).json({error: 'aadahr card number is must be 12 digit '})
    // }

    //check user with same aadhar card number already exists
    const eisestinguser = await User.findOne({
      aadharCardNumber: data.aadharCardNumber,
    });
    if (eisestinguser) {
      return res
        .status(400)
        .json({ error: "user with the same aadhar card number alredy " });
    }

    //create new person document useing new model
    const newUser = new User(data);

    // sava the new person to database
    const response = await newUser.save();
    console.log("data saved");
    //generete Token
    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error " });
  }
});
//login

routes.post("/login", async (req, res) => {
  try {
    // Extract data from request body
    const { aadharCardNumber, password } = req.body;
    

    // Validate input
    if (!aadharCardNumber || !password) {
      console.error("Missing aadharCardNumber or password");
      return res.status(400).json({ error: "Aadhar card number and password are required" });
    }

    // Find the user in the database
    const user = await User.findOne({ aadharCardNumber });
    if(user){
      console.log(user);
    }
    // console.log("User query result:", user);

    // Check if user exists and password matches
    if (!user || !(await user.comparePassword(password))) {
      console.error("Invalid credentials");
      return res.status(401).json({ error: "Invalid aadhar card number or password" });
    }

    // Generate JWT token
    const payload = { id: user.id };
    const token = generateToken(payload);
    console.log("Generated token:", token);

    // Send response
    res.json({ token });
  } catch (error) {
    console.error("Error in login route:", error); // Log full error
    res.status(500).json({ err: "login not work" });
  }
});

//prrofile routes
routes.get("/profile",jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData, "this is user")
    const userId = userData.id ;
 
    console.log("User ID:", userId);
    const user = await User.findById(userId );
    console.log(user, "this is user ")

    res.status(200).json( {user} );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error " });
  }
});

// update [password]

routes.put("/profile/password",jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract the id from the token
    const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body
    console.log(currentPassword, "and this is a new passwor:", newPassword)
    // Check if currentPassword and newPassword are present in the request body
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both currentPassword and newPassword are required" });
    }

    // Find the user by userID
    const user = await User.findById(userId);

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = routes;
