const Token = require("../model/token");
const User = require("../model/user");

module.exports.isAuthenticate = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token && token !== null) {
      const t = await Token.findById(token);
      now = new Date();
      if (!t || t.expiresAt < now) {
        res.status(401).json({
          message: "unauthorized",
        });
      }
      req.body.userId = t._ownerId.toString();
      next();
    } else {
      res.status(401).json({
        message: "unauthorized",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports.isAdmin = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token && token !== null) {
      const t = await Token.findById(token);
      now = new Date();
      if (!t || t.expiresAt < now) {
        res.status(401).json({
          message: "unauthorized",
        });
      }
      const user = await User.findById(t._ownerId);
      if (!user && user.role !== "admin") {
        res.status(403).json({
          message: "insufficient rights",
        });
      }
      req.body._ownerId = user._id;
      next();
    } else {
      res.status(401).json({
        message: "unauthorized",
      });
    }
  } catch (e) {
    next(e);
  }
};
