const Item = require("../../model/item");

async function DeleteAbl(req, res, next) {
  const itemId = req.params.id;
  try {
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json();
  } catch (e) {
    next(e);
  }
}

module.exports = DeleteAbl;
