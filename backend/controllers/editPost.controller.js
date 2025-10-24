import slugify from 'slugify'
import Post from '../models/Post.js'  // adapte le chemin selon ton projet

export async function getEditPostApi(request, reply) {
  const { slug } = request.params

  try {
    const post = await Post.findOne({ where: { slug } })

    if (!post) {
      return reply.status(404).send({ error: 'Post not found' })
    }

    return reply.send({ post })

  } catch (err) {
    request.log.error(err)
    return reply.status(500).send({ error: 'Database error' })
  }
}

export async function editPostApi(request, reply) {
  const { slug } = request.params
  const { title, content } = request.body
  const newSlug = slugify(title, { lower: true, strict: true })

  try {
    const [updatedRows] = await Post.update(
      { title, slug: newSlug, content },
      { where: { slug } }
    )

    if (updatedRows === 0) {
      return reply.status(404).send({ error: 'Post not found' })
    }

    return reply.send({ message: 'Post updated', slug: newSlug })

  } catch (err) {
    request.log.error(err)
    return reply.status(500).send({ error: 'Failed to update post' })
  }
}
