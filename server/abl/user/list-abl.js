const User = require("../../model/user");

async function ListAbl(req, res, next) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    next(e);
  }
}

module.exports = ListAbl;
