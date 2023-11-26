const Ajv = require("ajv").default;

let schema = {
  type: "object",
  properties: {
    avatar: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 5 },
    role: { type: "string" },
  },
  required: ["email", "password"],
};

async function UpdateAbl(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const ajv = new Ajv();
    let user = req.body;
    valid = ajv.validate(schema, ingredient);
    if (valid) {
      if (user.role === "admin") {
        //check if user from token is admin else  return 403
      }
      // update ingredient
      res.json(user);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: user,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = UpdateAbl;
