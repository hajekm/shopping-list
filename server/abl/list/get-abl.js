const List = require("../../model/list");

async function GetAbl(req, res, next) {
  try {
    const listId = req.params.id;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (e) {
    next(e);
  }
}

module.exports = GetAbl;
