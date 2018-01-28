import axios from 'axios';

export default (() => {
  const getAuthorization = () => {
    // scary how easy it is to do this
    const cookies = document.cookie.split('; ').reduce((agg, value) => {
      const arrayValue = value.split('=');
      const key = arrayValue[0];
      // eslint-disable-next-line
      agg[key] = arrayValue[1];
      return agg;
    }, {});

    return cookies.token;
  };

  const addAuthInformation = (auth = false) => {
    if (auth) {
      axios.interceptors.request.use((request) => {
        request.headers = {
          authorization: `Bearer ${getAuthorization()}`,
        };
        return request;
      });
    }
  };

  const get = (url, auth = false) => {
    addAuthInformation(auth);
    return axios.get(url);
  };

  const post = (url, data, auth = false) => {
    addAuthInformation(auth);
    return axios.post(url, data);
  };

  const put = (url, data, auth = false) => {
    addAuthInformation(auth);
    return axios.put(url, data);
  };

  return {
    get,
    post,
    put,
  };
})();
