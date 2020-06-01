import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://electoral-management.firebaseio.com/' 
});

export default instance;