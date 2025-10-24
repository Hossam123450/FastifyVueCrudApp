import Post from '../models/Post.js';

export async function getRoot(request, reply) {
  try {
    const posts = await Post.findAll(); // récupère tous les posts
    return { posts };
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch posts' });
  }
}

export async function getPostApi(request, reply) {
  const { slug } = request.params;
  try {
    const post = await Post.findOne({ where: { slug } });
    if (!post) {
      return reply.status(404).send({ error: 'Post not found' });
    }
    return { post };
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: 'Failed to fetch post' });
  }
}
