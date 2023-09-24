const User = require("../models/user");
const Msg = require("../models/messages");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_get = asyncHandler(async (req, res, next) => {
    res.render("msg_form", { errors: ""});
})

exports.create_post = [
    body("title", "Must enter title")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("text", "Must enter message")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        console.log(req.user);
        const errors = validationResult(req);
        const msg = new Msg({
            title: req.body.title,
            time: Date.now(),
            text: req.body.text,
            sender: req.user.id
        });

        if (!errors.isEmpty()) {
            res.render("msg_form", { errors: errors.array()});
        } else {
            await msg.save();
            res.redirect("/members/home");
        }
    })
];

exports.update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

exports.delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

// /home/maninder/.fly/bin/flyctl