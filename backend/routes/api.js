// routes/api.js
export default async function apiRoutes(fastify, options) {
  fastify.get('/posts', async (request, reply) => {
    const [rows] = await fastify.mysql.query('SELECT * FROM posts');
    return { posts: rows };
  });

  fastify.get('/post/:slug', async (request, reply) => {
    const { slug } = request.params;
    const [rows] = await fastify.mysql.query('SELECT * FROM posts WHERE slug = ?', [slug]);

    if (!rows.length) {
      return reply.status(404).send({ error: 'Post not found' });
    }

    return { post: rows[0] };
  });
}
