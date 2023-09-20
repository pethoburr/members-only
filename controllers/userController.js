const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Messages = require("../models/messages");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res, next) => {
    res.render("index", { title: "MEMBERS ONLY BITCH", user: req.user });
})

exports.messages_get = asyncHandler(async (req, res, next) => {
    const messages = await Messages.find().populate("sender").exec();
    res.render("main", { msgs: messages, user: req.user });
})

exports.create_get = asyncHandler(async (req, res, next) => {
    res.render("sign_up", { errors: "" });
})

exports.create_post = [
    body("first_name", "Must enter name")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("last_name", "Enter last name")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("username", "Username required")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("password", "enter password")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) { return next(err)};
            const errors = validationResult(req);
            console.log(req.user);
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
                membership_status: false,
                admin: false
            })
    
            if (!errors.isEmpty()) {
                res.render("sign_up", { errors: errors.array()});
                return;
            } else {
                const checker = await User.findOne({ username: req.body.username }).exec();
                if (checker) {
                    res.render("sign_up", { errors: "username exists"});
                    return;
                }
                console.log(req.user);
                await user.save();
                res.redirect("/members/home");
            }
        })
    })
];


exports.update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagen");
})

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagem");
})

exports.delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagel");
})

exports.delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagek");
})

exports.member_detail_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagec");
})

exports.join_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pageu");
})

exports.join_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home pagef");
})

exports.log_in_get = asyncHandler(async (req, res, next) => {
    res.render("log_in", { title: "Log In"});
})

// exports.log_in_post = [
//     body("username", "Must enter valid username")
//     .trim()
//     .isLength({  min: 1 })
//     .escape(),
//     body("password", "Usernme or password incorrect")
//     .trim()
//     .isLength({ min: 1})
//     .escape(),

//     asyncHandler(async (req, res, next) => {
//         const errors = validationResult(req);
//         const 

// })
// ];