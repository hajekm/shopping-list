async function DeleteAbl(req, res, next) {
  const listId = req.params.id;
  try {
    // delete list if not found return 404
    res.json(listId);
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
