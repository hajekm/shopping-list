const ajv = require("../../util/ajv-formats");
const List = require("../../model/list");
const IsMember = require("../../util/user-utils");
const AllItemsDone = require("../../util/item-utils");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    note: { type: "string" },
    status: { enum: ["new", "done", "cancelled"] },
    _ownerId: { type: "string", format: "objectid" },
  },
  required: ["title", "_ownerId"],
};

async function UpdateAbl(req, res, next) {
  const listId = req.params.listId;
  const itemId = req.params.id;
  try {
    if (!IsObjectId(listId)) {
      return res.status(400).json({ message: "Invalid List ID" });
    }
    const itemBody = req.body;
    valid = ajv.validate(schema, itemBody);
    if (valid) {
      const list = await List.findById(listId);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      if (!IsMember(itemBody.userId, list.members)) {
        return res.status(403).json({ message: "Insufficient rights" });
      }
      const index = list.items.findIndex((e) => e._id === itemId);
      if (index < 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      list.items[index].status = itemBody.status;
      list.items[index].title = itemBody.title;
      list.items[index].note = itemBody.note;
      if (AllItemsDone(list.items)) {
        list.status = "done";
      }
      await List.findByIdAndUpdate(list._id, list, {
        new: true,
      });
      return res.json(list);
    } else {
      return res.status(400).send({
        message: "validation of input failed",
        params: itemBody,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = UpdateAbl;
