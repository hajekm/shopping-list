const User = require("../../model/user");

async function GetAbl(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = "";
    res.json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = GetAbl;
