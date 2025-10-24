import Post from '../models/Post.js';  // adapte le chemin selon ton projet
import slugify from 'slugify';
import Ajv from 'ajv';

const ajv = new Ajv();

const postSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
      pattern: '^(?=.*[a-zA-Z]).+$',
    },
    content: { type: 'string', minLength: 1 },
  },
  required: ['title', 'content'],
  additionalProperties: false,
};

const validatePost = ajv.compile(postSchema);

export function getNewPost(request, reply) {
  // Côté serveur, affiche le formulaire
  return reply.view('new.ejs', { title: 'Create New Post' });
}

export async function createPostApi(request, reply) {
  const { title, content } = request.body;

  // Validation
  const valid = validatePost({ title, content });
  if (!valid) {
    return reply.status(400).send({
      error: 'Invalid input',
      details: validatePost.errors,
    });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    // Utilisation de Sequelize pour créer un post
    await Post.create({
      title,
      slug,
      content
    });

    return reply.status(201).send({ message: 'Post created', slug });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ error: 'Failed to create post' });
  }
}
