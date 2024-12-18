const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const jwtAuthMiddleware = (req, res, next) => {

const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ error: "Token not found" });
    }
    
    const token = req.headers.authorization.split(' ')[1]; // Expecting format: "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Function to generate a JWT token
const generateToken = (userData) => {
  // Generate a new token with user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '9h' }); // 9-hour expiration
};

module.exports = { jwtAuthMiddleware, generateToken };
