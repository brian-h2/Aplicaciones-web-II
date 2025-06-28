import axios from 'axios';

const API_BASE = 'http://localhost:4000'

export const getOrganizaciones = () => axios.get(`${API_BASE}/organizaciones`);
export const getRecetas = () => axios.get(`${API_BASE}/recetas`);
export const getProductos = () => axios.get(`${API_BASE}/productos`)

//Login y register

export const login = (credentials) => axios.post(`${API_BASE}/login`, credentials);
export const register = (credentials) => axios.post(`${API_BASE}/register`, credentials);