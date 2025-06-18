import axios from 'axios';

const instance = axios.create({ baseURL: 'https://saas-management-server-tzvg.onrender.com/api' });

export default instance;