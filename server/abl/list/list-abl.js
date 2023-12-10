const List = require("../../model/list");

async function ListAbl(req, res, next) {
  // const withItems = req.query.items;
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (e) {
    next(e);
  }
}

module.exports = ListAbl;
