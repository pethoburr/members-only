const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.render("index", { title: "MEMBERS ONLY BITCH"});
})

exports.messages_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

exports.create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

exports.create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})

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

exports.member_detail_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: home page");
})