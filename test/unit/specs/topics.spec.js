import axios from 'axios';
import Topics from '@/utilities/topics';

let sandBox;
let axiosstub;
const link = 'http://localhost:1236/api/v1';

const expectedResult = [
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

describe('Topic utility class', () => {
  before(() => {
    sandBox = sinon.sandbox.create();
    axiosstub = sandBox.stub(axios, 'get');

    axiosstub.withArgs(`${link}/topics?include=users`).returns(Promise.resolve(expectedResult));
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
      expect(result).to.equal(expectedResult);
      done();
    });
  });
});
