const Ajv = require("ajv").default;
const Token = require("../../model/token");
const User = require("../../model/user");
const bcrypt = require("bcrypt");

let schema = {
  type: "object",
  properties: {
    avatar: { type: "string" },
    email: { type: "string" },
    password: { type: "string", minLength: 5 },
    username: { type: "string" },
    role: { enum: ["user", "admin"] },
  },
  required: ["email", "password"],
};

const saltRounds = 10;

async function RegisterAbl(req, res, next) {
  try {
    const ajv = new Ajv();
    let userBody = req.body;
    const valid = ajv.validate(schema, userBody);
    if (valid) {
      hpassword = await bcrypt.hash(userBody.password, saltRounds);
      userBody.password = hpassword;
      if (userBody.username || userBody.username === "") {
        userBody.username = userBody.email;
      }
      if (userBody.avatar || userBody.avatar === "") {
        userBody.username = "defaultIcon";
      }
      userBody.role = "user"; //creates only user role and it could be edited later by admin
      const user = new User(userBody);
      await user.save();
      res.json(user);
    } else {
      res.status(400).send({
        message: "validation of input failed",
        params: userBody,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = RegisterAbl;
