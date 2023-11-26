async function ListAbl(req, res, next) {
  const withItems = req.query.items;
  try {
    let lists = [];
    if (withItems && withItems !== "false") {
      // return all lists where user is member or owner with items
    } else {
      // return all lists where user is member or owner without items
    }
    res.json(lists);
  } catch (e) {
    next(e);
  }
}

module.exports = ListAbl;
