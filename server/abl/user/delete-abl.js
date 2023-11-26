const path = require("path");

async function DeleteAbl(req, res, next) {
  const userId = req.params.id;
  console.log(userId);

  try {
    // delete user
    res.json({});
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
