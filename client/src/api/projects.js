import api from './axios';

export async function fetchProjects({ page = 1, limit = 12 } = {}) {
  const { data } = await api.get('/projects', { params: { page, limit } });
  return data.data;
}

export async function fetchProjectBySlug(slug) {
  const { data } = await api.get(`/projects/${slug}`);
  return data.data;
}

export async function createProject(payload) {
  const { data } = await api.post('/projects', payload);
  return data.data;
}

export async function updateProject(id, payload) {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data.data;
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`);
  return data.data;
}
