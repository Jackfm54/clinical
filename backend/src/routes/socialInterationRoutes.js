const express = require("express");
const {
  addComment,
  addForumPost,
} = require("../controllers/socialInteractionController");

const router = express.Router();

router.post("/comment", addComment);
router.post("/forum", addForumPost);

module.exports = router;
