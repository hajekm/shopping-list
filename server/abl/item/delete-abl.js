async function DeleteAbl(req, res, next) {
  const itemId = req.params.id;
  try {
    // delete item if not found return 404
    res.send(itemId);
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
