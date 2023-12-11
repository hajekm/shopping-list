const { ObjectId } = require("mongodb");

function IsUUID(uuid) {
  let s = "" + uuid;
  s = s.match(
    "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
  );
  return s !== null;
}

module.exports = IsUUID;

function IsObjectId(objId) {
  return ObjectId.isValid(objId);
}

module.exports = IsObjectId;
