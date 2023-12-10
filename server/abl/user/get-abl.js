const User = require("../../model/user");

async function GetAbl(req, res) {
  try {
    const UserId = req.params.id;
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;
