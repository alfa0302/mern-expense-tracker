const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user.id = decoded.id;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Token invalid" });
    }
  }
};

module.exports = protect;
