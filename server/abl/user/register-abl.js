const path = require("path");
const Ajv = require("ajv").default;

let schema = {
  type: "object",
  properties: {
    avatar: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 5 },
    username: { type: "string" },
  },
  required: ["email", "password"],
};

async function RegisterAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let user = req.body;
      //create
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

module.exports = RegisterAbl;
