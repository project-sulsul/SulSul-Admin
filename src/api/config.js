const sulApi = axios.create({
  baseURL: 'https://sulsul-env.eba-gvmvk4bq.ap-northeast-2.elasticbeanstalk.com/ a',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default sulApi;