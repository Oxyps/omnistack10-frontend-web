import axios from 'axios';

const api = axios.create({
    baseURL: 'http://devradar-abel.herokuapp.com'
});

export default api;