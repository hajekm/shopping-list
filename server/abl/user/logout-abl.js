const Token = require("../../model/token");
const User = require("../../model/user");

async function LogoutAbl(req, res, next) {
  try {
    const logoutBody = req.body;
      const user = await User.findById(logoutBody.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await Token.deleteMany({ _ownerId: user._id });
      res.json();
  } catch (e) {
    next(e);
  }
}

module.exports = LogoutAbl;
