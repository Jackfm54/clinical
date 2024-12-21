// Endpoint para manejar comentarios
const addComment = (req, res) => {
  const { postId, comment, userId } = req.body;
  // Lógica para guardar el comentario
  res.status(200).json({ message: "Comment added successfully" });
};

// Endpoint para manejar foros
const addForumPost = (req, res) => {
  const { title, content, userId } = req.body;
  // Lógica para guardar el post en el foro
  res.status(200).json({ message: "Forum post created successfully" });
};

module.exports = { addComment, addForumPost };
