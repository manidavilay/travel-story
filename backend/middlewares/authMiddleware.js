const jwt = require("jsonwebtoken");

// Authenticate Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    // Token invalid, forbidden
    if (error) {
      return res
        .status(403)
        .json({ message: "Access token is invalid or has expired" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
