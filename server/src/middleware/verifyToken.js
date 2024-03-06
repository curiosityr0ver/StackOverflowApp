const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (!err) {
        console.log(decodedToken);
        req.user = decodedToken;
        // console.log(req.user);
        next();
      } else {
        res.json({
          error: "unauthorised access",
          currentUser: "No user logged In.",
        });
      }

      // next();

    });
  } catch (error) {
    res.json({
      error: "unauthorised access",
      currentUser: "No user logged In.",
    });
  }
};

module.exports = verifyToken;
