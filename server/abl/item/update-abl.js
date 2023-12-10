const Ajv = require("ajv").default;
const Item = require("../../model/item");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    note: { type: "string" },
    status: { enum: ["new", "done", "cancelled"] },
  },
  required: ["title"],
};

async function UpdateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const itemBody = req.body;
    valid = ajv.validate(schema, itemBody);
    if (valid) {
      const item = await Item.findByIdAndUpdate(req.params.id, itemBody, {
        new: true,
      });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } else {
      res.status(400).send({
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
