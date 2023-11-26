const Ajv = require("ajv").default;

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
    let item = req.body;
    valid = ajv.validate(schema, ingredient);
    if (valid) {
      // update item if not found return 404
      res.json(item);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: item,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = UpdateAbl;
