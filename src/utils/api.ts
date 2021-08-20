import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/"
})

axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

export { api };