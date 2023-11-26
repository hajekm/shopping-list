const path = require("path");
const uuidValidator = require("../../util/uuid-validator")
const IngredientDao = require("../../dao/ingredient-dao");
let dao = new IngredientDao(
    path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

async function GetAbl(req, res) {
    try {
        const ingredientId = req.params.id;
        const valid = uuidValidator(ingredientId)
        if (valid) {
            const classroom = await dao.getIngredient(ingredientId);
            if (!classroom) {
                res
                    .status(404)
                    .send({ error: `ingredient with id '${ingredientId}' not found` });
            }
            res.json(classroom);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: req.body,
                reason: "requested id is not valid UUID",
            });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = GetAbl;