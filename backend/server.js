import Fastify from "fastify";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import routes from "./routes/routes.js";
import mysql from "@fastify/mysql";
import fastifyFormbody from "@fastify/formbody";
import fastifyCors from '@fastify/cors'; // <-- importer CORS
import apiRoutes from './routes/api.js';

const fastify = Fastify({ logger: true });

await fastify.register(mysql, {
  connectionString: 'mysql://root@127.0.0.1:3306/mydatabase',
  promise: true
});
await fastify.register(apiRoutes, { prefix: '/api' });
await fastify.register(fastifyView, {
  engine: {
    ejs
  },
  root: './views',
});

await fastify.register(fastifyFormbody);

// **Enregistrer CORS AVANT les routes**
await fastify.register(fastifyCors, {
  origin: 'http://localhost:3001', // remplace par l’URL de ton front si différent
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

await fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' }); // écoute sur toutes les interfaces
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
