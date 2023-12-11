const List = require("../../model/list");
const AllItemsDone = require("../../util/item-utils");

async function DeleteAbl(req, res, next) {
  const listId = req.params.id;
  let force = req.query.force;
  try {
    if (!IsObjectId(listId)) {
      return res.status(400).json({ message: "Invalid List ID" });
    }
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    if (list._ownerId.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Insufficient rights" });
    }
    if ((force && force.toLowerCase() === "true") || AllItemsDone(list.items)) {
      await List.findByIdAndDelete(list._id);
      return res.json();
    }
    return res
      .status(400)
      .json({ message: "List still contains unfinished items" });
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
