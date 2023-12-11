const Token = require("../../model/token");
const User = require("../../model/user");
const List = require("../../model/list");

async function DeleteAbl(req, res, next) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const lists = await List.find({
      $and: [
        ({ status: "new" },
        {
          members: { $elemMatch: { _id: userId } },
        }),
      ],
    });
    if (lists.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete user still member of active list" });
    }
    await Token.deleteMany({ _ownerId: userId });
    await User.findByIdAndDelete(userId);
    return res.json();
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
