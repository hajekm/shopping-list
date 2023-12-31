const Token = require("../../model/token");
const User = require("../../model/user");
const bcrypt = require("bcrypt");
const ajv = require("../../util/ajv-formats");

let schema = {
    type: "object",
    properties: {
        avatar: {type: "string"},
        email: {type: "string", format: "email"},
        password: {type: "string", minLength: 5},
        username: {type: "string"},
    },
    required: ["email", "password"],
};

const saltRounds = 10;

async function RegisterAbl(req, res, next) {
    try {
        let userBody = req.body;
        const valid = ajv.validate(schema, userBody);
        if (valid) {
            hpassword = await bcrypt.hash(userBody.password, saltRounds);
            userBody.password = hpassword;
            if (!userBody.username || userBody.username === "") {
                userBody.username = userBody.email;
            }
            if (!userBody.avatar || userBody.avatar === "") {
                userBody.avatar = "defaultIcon";
            }
            userBody.role = "user"; //creates only user role and it could be edited later by admin
            const user = new User(userBody);
            await user.save();
            user.password = "****";
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
