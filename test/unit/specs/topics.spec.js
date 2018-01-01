import axios from 'axios';
import Topics from '@/utilities/topics';

let sandBox;
let axiosstub;
const link = 'http://localhost:1236/api/v1';

const mockTopics = [
  {
    id: 1,
    topicName: 'topicName',
    userId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    topicName: 'topicName2',
    userId: 1,
    createdAt: new Date(),
  },
];

const mockPosts = [
  {
    id: 1,
    content: 'Some content here',
    userId: 1,
    createdAt: new Date(),
    topicId: 2,
    User: {
      name: 'Olutola Oreofeoluwapo',
    },
  },
  {
    id: 2,
    content: 'Some content here',
    userId: 1,
    createdAt: new Date(),
    topicId: 2,
    User: {
      name: 'Olutola Oreofeoluwapo',
    },
  },
];

describe('Topic utility class', () => {
  before(() => {
    sandBox = sinon.sandbox.create();
    axiosstub = sandBox.stub(axios, 'get');

    axiosstub.withArgs(`${link}/topics?include=users`).returns(Promise.resolve(mockTopics));
    axiosstub.withArgs(`${link}/topics/2?include=users`).returns(Promise.resolve(mockTopics[1]));
    axiosstub.withArgs(`${link}/topics/2/posts?include=users`).returns(Promise.resolve(mockPosts));
  });

  after(() => {
    sandBox.restore();
  });

  it('should have a getAll function', () => {
    expect(Topics.getAll).to.be.a('function');
  });

  it('should call axios get', (done) => {
    Topics.getAll();
    expect(axios.get).to.be.calledWith(`${link}/topics?include=users`);
    done();
  });

  it('getAll should return a promise with an array', (done) => {
    Topics.getAll().then((result) => {
      expect(result).to.equal(mockTopics);
      done();
    });
  });

  it('should have a getOne funcction', () => {
    expect(Topics.getOne).to.be.a('function');
  });

  it('should call axios get', (done) => {
    Topics.getOne();
    expect(axios.get).to.have.been.called;
    done();
  });

  it('should return a promise with topics and posts', (done) => {
    Topics.getOne(2).then((res) => {
      expect(res).to.be.an('array');
      expect(res[0]).to.equal(mockTopics[1]);
      expect(res[1]).to.equal(mockPosts);
      done();
    });
  });
});
