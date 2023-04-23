const jwt = require("jsonwebtoken");

const getSessionFromJWT = async (req, res, next) => {
  console.log(req.headers.authorization);
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, "Secret", (err, decoded) => {
      if (err) {
        res.status(401).json({
          auth: false,
          message: "Invalid token",
        });
      } else {
        req.userEmail = decoded.email;
        req.userId = decoded._id;
        next();
      }
    });
  }
};

module.exports = {
  getSessionFromJWT,
};
