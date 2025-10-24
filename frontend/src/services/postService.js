// src/services/postService.js
import axios from 'axios'

const API_BASE = '/api' // ton proxy Vite s'en charge

export const postService = {
  async getAll() {
    const res = await axios.get(`${API_BASE}/`)
    return res.data.posts
  },

  async getBySlug(slug) {
    const res = await axios.get(`${API_BASE}/post/${slug}`)
    return res.data.post
  },

  async create(postData) {
    const res = await axios.post(`${API_BASE}/post`, postData)
    return res.data
  },

  async update(slug, postData) {
    const res = await axios.post(`${API_BASE}/post/${slug}/edit`, postData)
    return res.data
  },

  async delete(slug) {
    const res = await axios.post(`${API_BASE}/post/${slug}/delete`)
    return res.data
  }
}
