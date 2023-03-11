const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  try {
    let accessToken = req.headers["accesstoken"] || req.cookies.accesstoken;

    if (!accessToken) {
      let err = new Error("Unauthorizes access. PLease login");
      err.status = 401;
      throw err;
    }

    let userObj = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = userObj["userId"];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
