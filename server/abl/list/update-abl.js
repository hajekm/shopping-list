const Ajv = require("ajv").default;

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
    let list = req.body;
    valid = ajv.validate(schema, recipe);
    if (valid) {
      // update list if not found return 404
      res.json(list);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: list,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = UpdateAbl;
