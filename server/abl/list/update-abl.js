const ajv = require("../../util/ajv-formats");
const List = require("../../model/list");
const IsObjectId = require("../../util/id-validator");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    members: { type: "array", items: { type: "object" }, uniqueItems: true },
    items: { type: "array", items: { type: "object" }, uniqueItems: true },
    _ownerId: { type: "string", format: "objectid" },
    status: { type: "string" },
  },
  required: ["title", "_ownerId"],
};

async function UpdateAbl(req, res, next) {
  try {
    const listId = req.params.id;
    if (!IsObjectId(listId)) {
      return res.status(400).json({ message: "Invalid List ID" });
    }
    const listBody = req.body;
    valid = ajv.validate(schema, listBody);
    if (valid) {
      if (listBody._ownerId !== req.body.userId) {
        return res.status(403).json({ message: "Insufficient rights" });
      }
      const list = await List.findByIdAndUpdate(listId, listBody, {
        new: true,
      });
      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }
      return res.json(item);
    } else {
      return res.status(400).send({
        message: "validation of input failed",
        params: listBody,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = UpdateAbl;
