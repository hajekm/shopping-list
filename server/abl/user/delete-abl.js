const Token = require("../../model/token");
const User = require("../../model/user");

async function DeleteAbl(req, res, next) {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    await Token.findOneAndDelete({ _ownerId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json();
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
