<script setup>
import { onMounted } from 'vue'
import { usePostStore } from './stores/postStore'

const postStore = usePostStore()

onMounted(() => {
  postStore.fetchAll()
})

function deletePost(slug) {
  const ok = confirm(`Delete post "${slug}" ?`)
  if (ok) postStore.deletePost(slug)
}
</script>

<template>
  <div class="blog-container">
    <h1 class="blog-title">Blog Posts</h1>

    <ul v-if="postStore.posts.length" class="posts">
      <li v-for="post in postStore.posts" :key="post.slug" class="post-item">
        <router-link :to="`/post/${post.slug}`" class="post-title">{{ post.title }}</router-link>

        <div class="post-actions">
          <router-link :to="`/post/${post.slug}/edit`" class="btn">Edit</router-link>
          <button @click="deletePost(post.slug)" class="btn btn-danger">Delete</button>
        </div>
      </li>
      <li class="create-new">
        <router-link to="/post/new" class="btn-create">Créer un article</router-link>
      </li>
    </ul>

    <p v-else>
      Aucun article pour le moment.
      Pourquoi ne pas <router-link to="/post/new">créer un article</router-link> ?
    </p>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.btn-create {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-create:hover {
  background-color: #2980b9;
}

.blog-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.posts {
  list-style: none;
  padding: 0;
}

.post-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f9f9f9;
}

.post-title {
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
  text-decoration: none;
}

.post-title:hover {
  text-decoration: underline;
}

.post-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
}

.btn:hover {
  background: #2980b9;
}

.btn-danger {
  background: #e74c3c;
}

.btn-danger:hover {
  background: #c0392b;
}

.create-new {
  margin-top: 1rem;
}
</style>
