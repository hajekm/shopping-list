const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const CreateAbl = require("../abl/list/create-abl");
const GetAbl = require("../abl/list/get-abl");
const UpdateAbl = require("../abl/list/update-abl");
const DeleteAbl = require("../abl/list/delete-abl");
const ListAbl = require("../abl/list/list-abl");

router.post("/", auth.isAuthenticate, async (req, res, next) => {
    await CreateAbl(req, res, next);
});

router.get("/", auth.isAuthenticate, async (req, res, next) => {
    await ListAbl(req, res, next);
});

router.put("/:id", auth.isAuthenticate, async (req, res, next) => {
    await UpdateAbl(req, res, next);
});

router.delete("/:id", auth.isAuthenticate, async (req, res, next) => {
    await DeleteAbl(req, res, next);
});
//
router.get("/:id", auth.isAuthenticate, async (req, res, next) => {
    await GetAbl(req, res, next);
});

module.exports = router;
