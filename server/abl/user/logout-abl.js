const Token = require("../../model/token");
const User = require("../../model/user");
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
    const logoutBody = req.body;
    const valid = ajv.validate(schema, logoutBody);
    if (valid) {
      const user = await User.findOne({ email: logoutBody.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await Token.findOneAndDelete({ _ownerId: user._id });
      res.json();
    } else {
      res.status(400).send({
        message: "validation of input failed",
        params: logoutBody,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = LogoutAbl;
