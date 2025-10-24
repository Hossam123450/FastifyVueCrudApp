import Post from '../models/Post.js'  // adapte le chemin selon ton projet

export async function getPostApi(request, reply) {
  const { slug } = request.params

  try {
    const post = await Post.findOne({ where: { slug } })

    if (!post) {
      return reply.status(404).send({ error: 'Post not found' })
    }

    // Retourne les données au format JSON
    return reply.send({ post })

  } catch (err) {
    request.log.error(err)
    return reply.status(500).send({ error: 'Database error' })
  }
}
