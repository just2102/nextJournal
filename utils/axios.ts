import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://next-journal-flax.vercel.app/api/',
});

export default instance;