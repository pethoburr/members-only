const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Msg = require("../models/messages");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.index = asyncHandler(async (req, res, next) => {
    res.render("index", { title: "MEMBERS ONLY BITCH" });
})

exports.messages_get = asyncHandler(async (req, res, next) => {
    const messages = await Msg.find().populate("sender").exec();
    console.log(req.user);
    res.render("main", { msgs: messages, user: req.user.member_status });
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
                member_status: false,
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
                res.redirect("/members/log-in");
            }
        })
    })
];



exports.join_get = asyncHandler(async (req, res, next) => {
    res.render("join_form", { errors: ""});
})

exports.join_post = [
    body("answer", "Incorrect answer")
        .trim()
        .toLowerCase()
        .notEmpty()
        .matches(/^batista$/i)
        .escape(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        let user = await User.findById(req.user.id);
        console.log(user);
        user.member_status = true;

        if (!errors.isEmpty()) {
            res.render("join_form", { errors: errors.array()});
            return;
        } else {
            user.save();
            res.redirect("/members/home");
        }
        
})
];

exports.log_in_get = asyncHandler(async (req, res, next) => {
    res.render("log_in", { title: "Log In"});
})

