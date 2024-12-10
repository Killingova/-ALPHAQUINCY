import apiClient from './apiClient';

export async function fetchDeviceStatus() {
  const response = await apiClient.get('/geräte/1');
  return response.data;
}

export async function registerDevice(data) {
  // Aktualisieren Sie den Eintrag für Gerät mit id=1
  const response = await apiClient.patch('/geräte/1', data);
  return response.data;
}
