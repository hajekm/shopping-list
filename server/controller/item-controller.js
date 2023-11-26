const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const CreateAbl = require("../abl/item/create-abl");
const UpdateAbl = require("../abl/item/update-abl");
const DeleteAbl = require("../abl/item/delete-abl");
const ListAbl = require("../abl/item/list-abl");

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

module.exports = router;
