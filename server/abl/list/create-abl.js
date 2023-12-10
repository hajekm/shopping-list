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

async function CreateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const listBody = req.body;
    const valid = ajv.validate(schema, listBody);
    if (valid) {
      const list = new List(listBody);
      await list.save();
      res.json(list);
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

module.exports = CreateAbl;
