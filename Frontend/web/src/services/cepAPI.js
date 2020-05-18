import axios from 'axios';

const cepAPI= axios.create({baseURL:'https://viacep.com.br/ws'});

export default cepAPI;