import axios from 'axios';

export default (() => {
  const get = url => axios.get(url);

  const post = (url, data) => axios.post(url, data);

  const put = (url, data) => axios.put(url, data);

  return {
    get,
    post,
    put,
  };
})();
