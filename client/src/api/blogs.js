import api from './axios';

export async function fetchBlogs({ page = 1, limit = 10 } = {}) {
  const { data } = await api.get('/blogs', { params: { page, limit } });
  return data.data;
}

export async function fetchAllBlogsAdmin({ page = 1, limit = 20 } = {}) {
  const { data } = await api.get('/blogs/admin/all', { params: { page, limit } });
  return data.data;
}

export async function fetchBlogBySlug(slug) {
  const { data } = await api.get(`/blogs/${slug}`);
  return data.data;
}

export async function createBlog(payload) {
  const { data } = await api.post('/blogs', payload);
  return data.data;
}

export async function updateBlog(id, payload) {
  const { data } = await api.put(`/blogs/${id}`, payload);
  return data.data;
}

export async function deleteBlog(id) {
  const { data } = await api.delete(`/blogs/${id}`);
  return data.data;
}
