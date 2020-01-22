import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: 'http://devradar-abel.herokuapp.com'
});

export default api;