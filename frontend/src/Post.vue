<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from './stores/postStore'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

onMounted(async () => {
  try {
    await postStore.fetchOne(route.params.slug)
  } catch (err) {
    alert('Erreur : ' + err.message)
    router.push('/')
  }
})
</script>

<template>
  <div v-if="postStore.currentPost" class="post-content">
    <h1>{{ postStore.currentPost.title }}</h1>
    <p>{{ postStore.currentPost.content }}</p>
    <router-link to="/" class="back-link">← Retour</router-link>
  </div>

  <div v-else class="loading">
    <p>Chargement...</p>
  </div>
</template>

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
