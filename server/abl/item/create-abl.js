const ajv = require("../../util/ajv-formats");
const List = require("../../model/list");
const mongoose = require("mongoose");
const { IsMember } = require("../../util/user-utils");
const IsObjectId = require("../../util/id-validator");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    note: { type: "string" },
    userId: { type: "string", format: "objectid" },
  },
  required: ["title", "userId"],
};

async function CreateAbl(req, res, next) {
  const listId = req.params.listId;
  try {
    if (!IsObjectId(listId)) {
      return res.status(400).json({ message: "Invalid List ID" });
    }
    let itemBody = req.body;
    const valid = ajv.validate(schema, itemBody);
    if (valid) {
      const list = await List.findById(listId);
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      if (!IsMember(itemBody.userId, list.members)) {
        return res.status(403).json({ message: "Insufficient rights" });
      }
      itemBody._id = new mongoose.Types.ObjectId();
      itemBody.createdAt = new Date();
      itemBody.status = "new";
      itemBody._ownerId = itemBody.userId;
      delete itemBody.userId;
      list.items.push(itemBody);
      if (list.status === "done") {
        list.status = "new";
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

module.exports = CreateAbl;
