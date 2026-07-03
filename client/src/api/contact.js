import api from './axios';

export async function submitContact(payload) {
  const { data } = await api.post('/contact', payload);
  return data;
}
