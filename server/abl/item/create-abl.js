const Ajv = require("ajv").default;

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
    const valid = ajv.validate(schema, req.body);
    let item = req.body;
    if (valid) {
      // create item
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

module.exports = CreateAbl;
