import Post from '../models/Post.js';  // adapte le chemin selon ton projet

export async function deletePostApi(request, reply) {
  const { slug } = request.params;

  try {
    // Suppression du post avec Sequelize
    const result = await Post.destroy({
      where: { slug }
    });

    if (result === 0) {  // aucun post supprimé
      return reply.status(404).send({ error: 'Post not found' });
    }

    return reply.send({ message: 'Post deleted successfully' });

  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: 'Failed to delete post' });
  }
}
