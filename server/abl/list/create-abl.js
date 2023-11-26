const Ajv = require("ajv").default;

let schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    members: { type: "array", items: { type: "object" }, uniqueItems: true },
  },
  required: ["title"],
};

async function CreateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    let list = req.body;
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      // create list
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

module.exports = CreateAbl;
