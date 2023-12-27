const List = require("../../model/list");
const User = require("../../model/user");
const ajv = require("../../util/ajv-formats");

let schema = {
    type: "object",
    properties: {
        title: {type: "string", minLength: 3},
        members: {type: "array", items: {type: "object"}, uniqueItems: true},
        userId: {type: "string", format: "objectid"},
    },
    required: ["title"],
};

async function CreateAbl(req, res, next) {
    try {
        const listBody = req.body;
        const valid = ajv.validate(schema, listBody);
        if (valid) {
            let user = await User.findById(listBody.userId);
            if (!user) {
                return res.status(404).json({message: "Owner not found"});
            }
            for (let i = 0; i < listBody.members.length; i++) {
                const u = await User.findById(listBody.members[i]._id);
                if (u) {
                    listBody.members[i]._id = u._id;
                    listBody.members[i].role = u.role;
                    listBody.members[i].avatar = u.avatar;
                    listBody.members[i].email = u.email;
                    listBody.members[i].username = u.username;
                    listBody.members[i].createdAt = u.createdAt;
                }
            }
            let userCopy = {
                _id: user._id,
                role: user.role,
                avatar: user.avatar,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
            };
            listBody.members.push(userCopy);
            const list = new List(listBody);
            await list.save();
            return res.json(list);
        } else {
            return res.status(400).send({
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
