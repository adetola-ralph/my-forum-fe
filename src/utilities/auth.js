import axios from 'axios';

export default class Authentication {
  constructor() {
    this.login = this.login.bind(this);
  }

  static login({ email, password }) {
    return axios.post('http://localhost:1236/api/v1/signin', { email, password });
  }

  static signup(signupObject) {
    return axios.post('http://localhost:1236/api/v1/signup', signupObject);
  }
}