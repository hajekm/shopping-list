const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const RegisterAbl = require("../abl/user/register-abl");
const UpdateAbl = require("../abl/user/update-abl");
const DeleteAbl = require("../abl/user/delete-abl");
const ListAbl = require("../abl/user/list-abl");
const LoginAbl = require("../abl/user/login-abl");
const LogoutAbl = require("../abl/user/logout-abl");

router.post("/", auth.isAuthenticate, auth.isAdmin, async (req, res, next) => {
  await RegisterAbl(req, res, next);
});

router.post("/login", async (req, res, next) => {
  await LoginAbl(req, res, next);
});

router.post("/logout", auth.isAuthenticate, async (req, res, next) => {
  await LogoutAbl(req, res, next);
});

router.get("/", auth.isAuthenticate, auth.isAdmin, async (req, res, next) => {
  await ListAbl(req, res, next);
});

router.put("/:id", auth.isAuthenticate, async (req, res, next) => {
  await UpdateAbl(req, res, next);
});

router.delete(
  "/:id",
  auth.isAuthenticate,
  auth.isAdmin,
  async (req, res, next) => {
    await DeleteAbl(req, res, next);
  }
);

module.exports = router;
