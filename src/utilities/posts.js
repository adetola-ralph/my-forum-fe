import request from './request';

export default class Posts {
  static newPost(postPayload) {
    return request.post(
      'http://localhost:1236/api/v1/posts',
      postPayload,
      true,
    );
  }
}
