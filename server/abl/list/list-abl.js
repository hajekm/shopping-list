const List = require("../../model/list");

async function ListAbl(req, res, next) {
    try {
        const lists = await List.find({
            members: {$elemMatch: {_id: req.body.userId}},
        });
        return res.json(lists);
    } catch (e) {
        next(e);
    }
}

module.exports = ListAbl;
