async function ListAbl(req, res, next) {
  try {
    //list all users
    res.json(req.body);
  } catch (e) {
    next(e);
  }
}

module.exports = ListAbl;
