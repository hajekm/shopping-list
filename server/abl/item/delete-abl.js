const List = require("../../model/list");
const IsObjectId = require("../../util/id-validator");
const {IsListOwnerOrItemOwner} = require("../../util/user-utils");

async function DeleteAbl(req, res, next) {
    const listId = req.params.listId;
    const itemId = req.params.id;
    try {
        if (!IsObjectId(listId) && !IsObjectId(itemId)) {
            return res.status(400).json({message: "Invalid input data"});
        }
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({message: "List not found"});
        }
        const item = list.items.find((e) => e._id === itemId);
        if (!item) {
            return res.status(404).json({message: "Item not found"});
        }
        if (
            !IsListOwnerOrItemOwner(req.body.userId, list._ownerId, item._ownerId)
        ) {
            return res.status(403).json({message: "Insufficient rights"});
        }
        list.items = list.items.filter((e) => e._id !== itemId);
        await List.findByIdAndUpdate(list._id, list, {
            new: true,
        });
        return res.json();
    } catch (e) {
        next(e);
    }
}

module.exports = DeleteAbl;
