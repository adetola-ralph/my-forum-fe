import axios from 'axios';

const axiosInstance = axios.create();

export default (() => {
  const getAuthorization = () => {
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
      axiosInstance.interceptors.request.use((request) => {
        request.headers = {
          authorization: `Bearer ${getAuthorization()}`,
        };
        return request;
      });
    }
  };

  const get = (url, auth = false) => {
    addAuthInformation(auth);
    return axiosInstance.get(url);
  };

  const post = (url, data, auth = false) => {
    addAuthInformation(auth);
    return axiosInstance.post(url, data);
  };

  const put = (url, data, auth = false) => {
    addAuthInformation(auth);
    return axiosInstance.put(url, data);
  };

  return {
    get,
    post,
    put,
  };
})();
