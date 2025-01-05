import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 422) {
    // Handle 422 errors (possibly related to JWT)
    console.error('Authentication error:', error.response.data);
    // You might want to redirect to login or refresh the token here
  }
  return Promise.reject(error);
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string, name: string) => {
  const response = await api.post('/register', { username, password, name });
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export const createWork = async (work: { courseId: number, title: string, description: string, price: number }) => {
  const response = await api.post('/works', {
    course: work.courseId,
    title: work.title,
    description: work.description,
    price: work.price
  });
  return response.data;
};

export const getWork = async (id: string) => {
  const response = await api.get(`/works/${id}`);
  return response.data;
};

export const updateWork = async (id: string, work: { course: number, title: string, description: string, price: number }) => {
  const response = await api.put(`/works/${id}`, work);
  return response.data;
};

export const deleteWork = async (id: string) => {
  const response = await api.delete(`/works/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const getWorks = async () => {
  const response = await api.get('/works');
  return response.data;
};

export default api;

