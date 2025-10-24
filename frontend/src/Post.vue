<template>
  <div class="post-content" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>

  <div v-else class="loading">
    <p>Loading post...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug

const post = ref(null)
const API_BASE = '/api'

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/post/${slug}/edit`)
    if (!res.ok) throw new Error('Post not found')
    const data = await res.json()
    post.value = data.post
  } catch (err) {
    alert('Error loading post: ' + err.message)
    router.push('/')
  }
})
</script>

<style scoped>
.post-content {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.post-content h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.post-content p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #3498db;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
