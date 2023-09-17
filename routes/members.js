const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const msg_controller = require("../controllers/msgController");

router.get("/", user_controller.index);

router.get("/home", user_controller.messages_get);

router.get("/sign-up", user_controller.create_get);

router.post("/sign-up", user_controller.create_post);

router.get("/:id", user_controller.member_detail_get);

router.get("/create", msg_controller.create_get);

router.post("/create", msg_controller.create_post);

router.get("/update", msg_controller.update_get);

router.post("/update", msg_controller.update_post);

router.get("/delete", msg_controller.delete_get);

router.post("/delete", msg_controller.delete_post);

module.exports = router;