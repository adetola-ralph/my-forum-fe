import request from './request';

export default class Topics {
  static getAll() {
    return request.get('http://localhost:1236/api/v1/topics?include=users');
  }

  static getOne(topicId) {
    return Promise.all([
      request.get(`http://localhost:1236/api/v1/topics/${topicId}?include=users`),
      request.get(`http://localhost:1236/api/v1/topics/${topicId}/posts?include=users`),
    ]);
  }
}
