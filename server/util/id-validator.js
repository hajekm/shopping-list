const {ObjectId} = require("mongodb");

function IsObjectId(objId) {
    return ObjectId.isValid(objId);
}

module.exports = IsObjectId;
