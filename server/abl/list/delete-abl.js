const List = require("../../model/list");

async function DeleteAbl(req, res, next) {
  const listId = req.params.id;
  try {
    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.json();
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
