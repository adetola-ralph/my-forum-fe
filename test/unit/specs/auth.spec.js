import axios from 'axios';
import Auth from '@/utilities/auth';

let sandBox;
let axiosstub;
const name = 'name';
const link = 'http://localhost:1236/api/v1';

describe('Auth utility helper', () => {
  before(() => {
    sandBox = sinon.sandbox.create();
    axiosstub = sandBox.stub(axios, 'post');

    axiosstub.withArgs(`${link}/signin`, { email: 'warol2@yahoo.com', password: 'xxxx' })
    .returns(Promise.resolve(4));

    axiosstub.withArgs(`${link}/signup`, { name, email: 'warol2@yahoo.com', password: 'xxxx' })
    .returns(Promise.resolve(4));
  });

  after(() => {
    sandBox.restore();
  });

  it('should have a login function', () => {
    expect(Auth.login).to.be.a('function');
  });

  it('should have a signup function', () => {
    expect(Auth.signup).to.be.a('function');
  });

  it('login should call axios post', (done) => {
    Auth.login({ email: 'warol2@yahoo.com', password: 'xxxx' });
    expect(axios.post).to.be.calledWith(`${link}/signin`, { email: 'warol2@yahoo.com', password: 'xxxx' });
    done();
  });

  it('signup should call axios post', (done) => {
    Auth.signup({ name, email: 'warol2@yahoo.com', password: 'xxxx' });
    expect(axios.post).to.be.calledWith(`${link}/signup`, { name, email: 'warol2@yahoo.com', password: 'xxxx' });
    done();
  });
});
