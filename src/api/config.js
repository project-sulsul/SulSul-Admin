import axios from "axios";

const sulApi = axios.create({
  baseURL: 'https://sulsul.link',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default sulApi;