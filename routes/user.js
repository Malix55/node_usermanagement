const express = require("express");
const router = express.Router();

const { view, find, adduser } = require("../controllers/userController");

router.get("/", view);
router.post("/", find);
router.get("/adduser", adduser);

module.exports = router;
