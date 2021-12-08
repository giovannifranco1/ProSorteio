import axios from "axios";
//import Cookie from "js-cookie";

const api = axios.create({
  baseURL: 'https://localhost:5001/api/',
});


export default api;