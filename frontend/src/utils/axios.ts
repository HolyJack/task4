import axios from "axios";

axios.defaults.baseURL = "https://task4-express-back.vercel.app";
axios.defaults.withCredentials = true;

export default axios;
