var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");
var userController = require("../controllers/userController");

router.get("/:first_name/:last_name", userController.get_user_info);

/* GET user listing. */
router.get("/", userController.get_all_users);

/* create new user */
router.post("/new", userController.create_new_user);

/* update  user */
router.post("/update", userController.update_new_user);

module.exports = router;
