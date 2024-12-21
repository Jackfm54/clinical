const {
  addComment,
  getCommentsByPost,
  addForumPost,
  getAllForumPosts,
} = require("../services/socialInteractionService");

const createComment = async (req, res) => {
  const { userId, postId, content } = req.body;
  try {
    const comment = await addComment(userId, postId, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createForumPost = async (req, res) => {
  const { userId, title, content } = req.body;
  try {
    const post = await addForumPost(userId, title, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getForumPosts = async (req, res) => {
  try {
    const posts = await getAllForumPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  createForumPost,
  getForumPosts,
};
