const Item = require("../../model/item");

async function ListAbl(req, res, next) {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (e) {
    next(e);
  }
}

module.exports = ListAbl;
