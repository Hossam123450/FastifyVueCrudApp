// routes/routes.js
import { getRoot, getPostApi } from '../controllers/controller.js';
import {
  getNewPost,
  createPostApi,
} from "../controllers/createPost.controller.js";
import { getEditPostApi, editPostApi } from "../controllers/editPost.controller.js";
import { deletePostApi } from "../controllers/deletePost.controller.js";

export default async function routes(fastify, options) {
  // Root route (homepage)
  fastify.get("/", getRoot);

  // Register nested routes under /post
  fastify.register(async function (postRoutes) {
    postRoutes.post("/", createPostApi);              // POST /post
    postRoutes.get("/:slug", getPostApi);             // GET /post/:slug
    postRoutes.get("/:slug/edit", getEditPostApi);    // GET /post/:slug/edit
    postRoutes.post("/:slug/edit", editPostApi);      // POST /post/:slug/edit
    postRoutes.post("/:slug/delete", deletePostApi);  // POST /post/:slug/delete
  }, {
    prefix: "/post"
  });
}
