<template>
  <div class="blog-container">
    <h1 class="blog-title">Blog Posts</h1>

    <ul v-if="posts.length > 0" class="posts">
      <li v-for="post in posts" :key="post.slug" class="post-item">
        <router-link :to="`/post/${post.slug}`" class="post-title">
          {{ post.title }}
        </router-link>

        <div class="post-actions">
          <router-link :to="`/post/${post.slug}/edit`" class="btn">
            Edit
          </router-link>

          <button @click="deletePost(post.slug)" class="btn btn-danger">
            Delete
          </button>
        </div>
      </li>
      <li class="create-new">
  <router-link to="/post/new" class="btn-create">
    Create a new post
  </router-link>
</li>

      <router-view /> <!-- 👈 TRÈS IMPORTANT -->
    </ul>

    <p v-else>
      There are no blog posts yet.
      Why not <router-link to="/post/new">create one</router-link>?
    </p>
    <router-view /> <!-- 👈 TRÈS IMPORTANT -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Base de l’API
const API_BASE = '/api'

// Liste des articles
const posts = ref([])

// Charger les posts au montage
async function fetchPosts() {
  try {
    const res = await fetch(`${API_BASE}/`)
    const data = await res.json()
    posts.value = data.posts || []
  } catch (err) {
    console.error('Failed to load posts:', err)
  }
}

onMounted(fetchPosts)

// Suppression d’un post
async function deletePost(slug) {
  const confirmDelete = confirm(`Delete post "${slug}"?`)
  if (!confirmDelete) return

  try {
    const res = await fetch(`${API_BASE}/post/${slug}/delete`, {
      method: 'POST'
    })

    const text = await res.text()
    console.log('Delete response text:', text)

    if (res.ok) {
      // Mets à jour la liste seulement si suppression OK
      posts.value = posts.value.filter(post => post.slug !== slug)
    } else {
      alert(`Failed to delete: ${text}`)
    }
  } catch (err) {
    alert(`Error deleting post: ${err.message}`)
  }
}

</script>

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
