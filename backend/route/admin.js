const express = require("express");
const router = express.Router();

const {
  LoginController,
  LoginVerifyController,
} = require("../controller/login");

const {
  CreateBlogController,
  ViewBlogsController,
  deleteBlogController,
} = require("../controller/blog");

const {
  CreatePollController,
  ViewPollsController,
  deletePollController,
} = require("../controller/poll");

const fileUpload = require("../config/file-system");

router.post("/login", LoginController);
router.post("/verify-login", LoginVerifyController);
router.post("/new-blog", fileUpload, CreateBlogController);
router.get("/blogs", ViewBlogsController);
router.delete("/blog/:id", deleteBlogController);
router.post("/new-poll", fileUpload, CreatePollController);
router.get("/polls", ViewPollsController);
router.delete("/poll/:id", deletePollController);
module.exports = router;
