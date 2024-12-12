import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchTodos = () => API.get('/todos');
export const fetchTodo = id => API.get(`/todos/${id}`);
export const createTodo = todo => API.post('/todos', todo);
export const updateTodo = (id, updatedTodo) => API.put(`/todos/${id}`, updatedTodo);
export const deleteTodo = id => API.delete(`/todos/${id}`);
