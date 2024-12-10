// authApi.js
import apiClient from './apiClient';

export async function login(username, password) {
  const response = await apiClient.get('/admins');
  const admins = response.data;
  const admin = admins.find(a => a.username === username && a.password === password);
  return admin || null;
}
