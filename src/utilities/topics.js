import request from './request';

export default class Topics {
  static getAll() {
    return request.get('http://localhost:1236/api/v1/topics');
  }
}
