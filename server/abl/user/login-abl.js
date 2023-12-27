const Ajv = require("ajv").default;
const Token = require("../../model/token");
const User = require("../../model/user");
const bcrypt = require("bcrypt");

let schema = {
    type: "object",
    properties: {
        email: {type: "string"},
        password: {type: "string"},
    },
    required: ["email", "password"],
};

async function LoginAbl(req, res, next) {
    try {
        const ajv = new Ajv();
        const loginBody = req.body;
        const valid = ajv.validate(schema, req.body);
        if (valid) {
            const user = await User.findOne({email: loginBody.email});
            if (!user) {
                return res.status(400).json({message: "Invalid credentials"});
            }
            if (!bcrypt.compare(loginBody.password, user.password)) {
                return res.status(400).json({message: "Invalid credentials"});
            }
            now = new Date();
            now.setDate(now.getDate() + 7); //for better testing
            const token = new Token({expiresAt: now, _ownerId: user._id});
            await token.save();
            res.json(token);
        } else {
            res.status(400).send({
                message: "validation of input failed",
                params: loginBody,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        next(e);
    }
}

module.exports = LoginAbl;
