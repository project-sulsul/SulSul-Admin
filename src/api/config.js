import axios from "axios";


const sulApi = axios.create({
  // baseURL: 'http://sulsul-env.eba-gvmvk4bq.ap-northeast-2.elasticbeanstalk.com',
  baseURL: 'https://sulsul.link',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default sulApi;