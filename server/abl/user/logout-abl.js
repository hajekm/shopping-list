const path = require("path");
const Ajv = require("ajv").default;

let schema = {
  type: "object",
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
};

async function LogoutAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let user = req.body;
      //remove token from user or return 404 if not found
      res.json(user);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = LogoutAbl;
