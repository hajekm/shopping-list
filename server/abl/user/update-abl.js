const Ajv = require("ajv").default;
const User = require("../../model/user");

let schema = {
  type: "object",
  properties: {
    avatar: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 5 },
    role: { type: "string" },
  },
  required: ["email"],
};

async function UpdateAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    const userBody = req.body;
    valid = ajv.validate(schema, userBody);
    if (valid) {
      const user = await User.findByIdAndUpdate(req.params.id, userBody, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
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
