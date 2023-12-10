const Ajv = require("ajv").default;
const Item = require("../../model/item");

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    note: { type: "string" },
  },
  required: ["title"],
};

async function CreateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const itemBody = req.body;
    const valid = ajv.validate(schema, itemBody);
    if (valid) {
      const item = new Item(itemBody);
      await item.save();
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

module.exports = CreateAbl;
