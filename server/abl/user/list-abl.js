const User = require("../../model/user");

async function ListAbl(req, res, next) {
    try {
        const users = await User.find();
        users.forEach((u) => (u.password = "****"));
        res.json(users);
    } catch (e) {
        next(e);
    }
}

module.exports = ListAbl;
