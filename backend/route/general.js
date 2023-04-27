const express = require("express");
const router = express.Router();
const { ViewBlogsController } = require("../controller/blog");
const {
  ViewPollsController,
  SinglePollController,
  VotePollController,
  VerifyVoted,
  addComment,
} = require("../controller/poll");

router.get("/blogs", ViewBlogsController);
router.get("/polls", ViewPollsController);
router.get("/poll/:id", SinglePollController);
router.patch("/poll/:id", VotePollController);
router.get("/poll/verify/:id", VerifyVoted);
router.patch("/poll/:id/comment", addComment);

module.exports = router;
