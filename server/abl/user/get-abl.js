const User = require("../../model/user");
const IsObjectId = require("../../util/id-validator");

async function GetAbl(req, res, next) {
    try {
        const userId = req.params.id;
        if (!IsObjectId(userId)) {
            return res.status(400).json({message: "Invalid User ID"});
        }
        if (req.body.userId !== userId) {
            return res.status(403).json({message: "Insufficient rights"});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.password = "****";
        return res.json(user);
    } catch (e) {
        next(e);
    }
}

module.exports = GetAbl;
