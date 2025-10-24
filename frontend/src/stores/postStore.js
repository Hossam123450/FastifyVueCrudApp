// src/stores/postStore.js
import { defineStore } from 'pinia'
import { postService } from '../services/postService'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        this.posts = await postService.getAll()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchOne(slug) {
      this.loading = true
      try {
        this.currentPost = await postService.getBySlug(slug)
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async createPost(data) {
      const newPost = await postService.create(data)
      this.posts.push(newPost)
      return newPost
    },

    async updatePost(slug, data) {
      const updated = await postService.update(slug, data)
      const index = this.posts.findIndex(p => p.slug === slug)
      if (index !== -1) this.posts[index] = updated
      this.currentPost = updated
      return updated
    },

    async deletePost(slug) {
      await postService.delete(slug)
      this.posts = this.posts.filter(p => p.slug !== slug)
    }
  }
})
