// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/notes';

export const getNotes = async () => {
  return axios.get(API_URL);
};

export const createNote = async (note: { title: string; content: string; image: string }) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data; // Return the created note
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const deleteNote = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const updateNote = async (id: number, note: { title: string; content: string; image: string }) => {
  return axios.put(`${API_URL}/${id}`, note);
};
