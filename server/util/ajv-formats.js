const {ObjectId} = require("mongodb");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({allErrors: true});
addFormats(ajv);
ajv.addFormat("objectid", {
    type: "string",
    validate: (data) => {
        return ObjectId.isValid(data);
    },
});

module.exports = ajv;
