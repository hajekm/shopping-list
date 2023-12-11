const ajv = require("../../util/ajv-formats");
const List = require("../../model/list");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    members: { type: "array", items: { type: "object" }, uniqueItems: true },
    items: { type: "array", items: { type: "object" }, uniqueItems: true },
    _ownerId: { type: "string", format: "objectid" },
  },
  required: ["title", "_ownerId"],
};

async function UpdateAbl(req, res, next) {
  try {
    const listBody = req.body;
    valid = ajv.validate(schema, listBody);
    if (valid) {
      if (listBody._ownerId !== req.body.userId) {
        return res.status(403).json({ message: "Insufficient rights" });
      }
      const list = await List.findByIdAndUpdate(req.params.id, listBody, {
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
