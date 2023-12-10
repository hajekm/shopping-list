const Ajv = require("ajv").default;
const List = require("../../model/list");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    members: { type: "array", items: { type: "object" }, uniqueItems: true },
  },
  required: ["title"],
};

async function UpdateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const listBody = req.body;
    valid = ajv.validate(schema, listBody);
    if (valid) {
      const list = await List.findByIdAndUpdate(req.params.id, listBody, {
        new: true,
      });
      if (!item) {
        return res.status(404).json({ message: "List not found" });
      }
      res.json(item);
    } else {
      res.status(400).send({
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
