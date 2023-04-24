const jwt = require("jsonwebtoken");

const getSessionFromJWT = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  console.log(bearerToken);

  if (!bearerToken) {
    console.log("[SESSION-OPERATION] - No token provided");
    res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, "Secret", (err, decoded) => {
      if (err) {
        console.log("[SESSION-OPERATION] - Invalid token ");
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
