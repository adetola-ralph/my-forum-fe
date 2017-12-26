import request from './request';

export default class Auth {
  static login({ email, password }) {
    return request.post('http://localhost:1236/api/v1/signin', { email, password });
  }

  static signup(signupObject) {
    return request.post('http://localhost:1236/api/v1/signup', signupObject);
  }
}
