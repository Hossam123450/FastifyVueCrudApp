<template>
  <div class="edit-post-container">
    <h1>Edit Post</h1>

    <form class="edit-post-form" @submit.prevent="submitForm">
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

      <button type="submit">Update</button>
    </form>
    <router-link to="/" class="back-link">Back to Home</router-link>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from './stores/postStore'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const slug = route.params.slug
const form = ref({ title: '', content: '' })

onMounted(async () => {
  await postStore.fetchOne(slug)
  form.value = {
    title: postStore.currentPost.title,
    content: postStore.currentPost.content
  }
})

async function submitForm() {
  try {
    const updated = await postStore.updatePost(slug, form.value)
    router.push(`/post/${updated.slug}`)
  } catch (err) {
    alert(err.message)
  }
}
</script>
<style scoped>
.edit-post-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.edit-post-form {
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
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}
</style>
