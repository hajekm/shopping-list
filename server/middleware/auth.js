module.exports.isAuthenticate = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check token and expired date maybe JWT implementation
  if (token && token !== null) {
    next();
  } else {
    res.status(401).json({
      reason: "unauthorized",
    });
  }
};

module.exports.isAdmin = function (req, res, next) {
  const role = "admin";
  if (role === "admin") {
    next();
  } else {
    res.status(403).json({
      reason: "insufficient rights",
    });
  }
};
