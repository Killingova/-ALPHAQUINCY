// src/api/checkinApi.js
import apiClient from './apiClient';

export async function fetchPatients() {
  try {
    const response = await apiClient.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Patienten:', error);
    throw error;
  }
}

export async function fetchAppointments() {
  try {
    const response = await apiClient.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Termine:', error);
    throw error;
  }
}

export async function fetchPatientById(id) {
  try {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Fehler beim Abrufen des Patienten mit ID ${id}:`, error);
    throw error;
  }
}

export async function fetchAppointmentById(id) {
  try {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Fehler beim Abrufen des Termins mit ID ${id}:`, error);
    throw error;
  }
}

export async function fetchAnamneseFields() {
  try {
    const response = await apiClient.get('/anamneseFields');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Anamnese-Felder:', error);
    throw error;
  }
}

export async function updateAppointment(id, updatedFields) {
  try {
    const response = await apiClient.patch(`/appointments/${id}`, updatedFields);
    return response.data;
  } catch (error) {
    console.error(`Fehler beim Aktualisieren des Termins mit ID ${id}:`, error);
    throw error;
  }
}
