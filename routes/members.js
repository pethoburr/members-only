const express = require("express");
const router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");
const msg_controller = require("../controllers/msgController");

router.get("/", user_controller.index);

router.get("/home", user_controller.messages_get);

router.get("/sign-up", user_controller.create_get);

router.post("/sign-up", user_controller.create_post);

router.get("/user", user_controller.member_detail_get);

router.get("/create", msg_controller.create_get);

router.post("/create", msg_controller.create_post);

router.get("/update", msg_controller.update_get);

router.post("/update", msg_controller.update_post);

router.get("/delete", msg_controller.delete_get);

router.post("/delete", msg_controller.delete_post);

router.get("/join", user_controller.join_get);

router.post("/join", user_controller.join_post);

router.get("/log-in", user_controller.log_in_get);

router.post(
    "/log-in", 
    passport.authenticate("local", {
      successRedirect: "/members/home",
      failureRedirect: "/members/log-in"
    })
);

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

module.exports = router;