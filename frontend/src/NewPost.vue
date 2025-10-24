<template>
  <div class="create-post-container">
    <h1>Create New Post</h1>

    <form class="create-post-form" @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        v-model="form.title"
        required
      />

      <label for="content">Content:</label>
      <textarea
        id="content"
        v-model="form.content"
        required
      ></textarea>

      <button type="submit">Create</button>
    </form>
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  title: '',
  content: ''
})

const API_BASE = '/api'

async function submitForm() {
  try {
    const res = await fetch(`${API_BASE}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error)
    }

    const data = await res.json()
    router.push(`/post/${data.slug}`) // Redirige vers la page du nouveau post
  } catch (err) {
    alert('Failed to create post: ' + err.message)
  }
}
</script>

<style scoped>
.create-post-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.create-post-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
