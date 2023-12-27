const List = require("../../model/list");
const IsObjectId = require("../../util/id-validator");
const {IsMember} = require("../../util/user-utils");

async function ListAbl(req, res, next) {
    const listId = req.params.listId;
    try {
        if (!IsObjectId(listId)) {
            return res.status(400).json({message: "Invalid List ID"});
        }
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({message: "List not found"});
        }
        if (!IsMember(req.body.userId, list.members)) {
            return res.status(403).json({message: "Insufficient rights"});
        }
        return res.json(list.items);
    } catch (e) {
        next(e);
    }
}

module.exports = ListAbl;
