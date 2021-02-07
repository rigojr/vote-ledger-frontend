import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://ec2-54-234-163-178.compute-1.amazonaws.com:3000/' 
});

export default instance;