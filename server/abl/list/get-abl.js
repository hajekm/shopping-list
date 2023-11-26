async function GetAbl(req, res, next) {
  try {
    const listId = req.params.id;
    // find list and return if not found 404
    res.json(listId);
  } catch (e) {
    next(e);
  }
}

module.exports = GetAbl;
