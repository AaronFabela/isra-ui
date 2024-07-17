import axios from 'axios';

// URL de la API de login
const API_LOGIN_URL = 'https://your-backend-url.com/api/login'; // Cambia esto a la URL de tu API de login

// Función para manejar el login
export const login = async (email, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { email, password });
    
    if (response.data && response.data.token) {
      // Almacenar el token en el localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error en el login:', error);
    return false;
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('user');
};
