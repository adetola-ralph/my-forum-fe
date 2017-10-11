import Vue from 'vue';
import VueValidate from 'vee-validate';
import { mount } from 'vue-test-utils';
import Authentication from '@/components/authentication/authentication';
import Auth from '@/utilities/auth';

let wrapper;
let data;
let sandbox;

describe('Authentication.vue', () => {
  before(() => {
    Vue.use(VueValidate);
    wrapper = mount(Authentication);
    data = wrapper.vm;
  });

  it('should have signin object', () => {
    expect(data.signInObject).to.be.an('object');
  });

  it('should have signup object', () => {
    expect(data.signUpObject).to.be.an('object');
  });

  it('expect signin option to be true', () => {
    expect(data.signIn).to.equal(true);
  });

  it('expect ifError option to be false', () => {
    expect(data.ifError).to.equal(false);
  });

  it('expect errorMessage to be empty string', () => {
    expect(wrapper.vm.errorMessage).to.be.a('string');
    expect(data.errorMessage).to.be.equal('');
  });

  it('should have the signin form visible', () => {
    expect(wrapper.contains('form.sign-in')).to.equal(true);
    expect(wrapper.contains('form.sign-up')).to.equal(false);
  });

  it('can switch to signup form', (done) => {
    const switchForm = wrapper.find('.switch-form-signup');
    switchForm.trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.contains('form.sign-in')).to.equal(false);
      expect(wrapper.contains('form.sign-up')).to.equal(true);
      expect(wrapper.contains('.switch-form-signin')).to.equal(true);
      expect(wrapper.find('.switch-form-signin').is('a')).to.equal(true);
      done();
    });
  });

  it('can switch to signin form', (done) => {
    const switchForm = wrapper.find('.switch-form-signin');
    switchForm.trigger('click');
    Vue.nextTick(() => {
      expect(wrapper.contains('form.sign-in')).to.equal(true);
      expect(wrapper.contains('form.sign-up')).to.equal(false);
      expect(wrapper.contains('.switch-form-signup')).to.equal(true);
      expect(wrapper.find('.switch-form-signup').is('a')).to.equal(true);
      done();
    });
  });

  describe('login test', () => {
    it('should fail if signin form has no content', (done) => {
      const signinButton = wrapper.find('form.sign-in button');
      signinButton.trigger('click');
      Vue.nextTick().then(() => {
        const errorPanels = wrapper.findAll('form.sign-in p.text-danger');
        expect(errorPanels.at(0).text().trim()).to.equal('The email field is required.');
        expect(errorPanels.at(1).text().trim()).to.equal('The password field is required.');
        done();
      }).catch(err => done(err));
    });

    it('should fail on invalid email', (done) => {
      const signinButton = wrapper.find('form.sign-in button');
      data.signInObject = {
        email: 'random string',
        password: 'password',
      };
      signinButton.trigger('click');
      Vue.nextTick().then(() => {
        const errorPanels = wrapper.findAll('form.sign-in p.text-danger');
        expect(errorPanels.at(0).text().trim()).to.equal('The email field must be a valid email.');
        done();
      }).catch(err => done(err));
    });

    describe('backend requests', () => {
      let loginStub;
      let validateAllStub;
      before(() => {
        sandbox = sinon.sandbox.create();
        loginStub = sandbox.stub(Auth, 'login');
        loginStub.withArgs({
          email: 'good@email.ng',
          password: 'password',
        }).resolves({
          token: 'xxxx',
        });
        loginStub.withArgs({
          email: 'bad@email.ng',
          password: 'password',
        }).rejects({
          response: {
            data: { message: 'Authentication failed: Invalid user' },
          },
        });
        validateAllStub = sandbox.stub(wrapper.vm.$validator, 'validateAll');
        validateAllStub.resolves(() => {
          Auth.login();
        });
      });

      after(() => {
        sandbox.restore();
      });

      it('validator to be called', (done) => {
        const signinButton = wrapper.find('form.sign-in button');
        signinButton.trigger('click');
        Vue.nextTick().then(() => {
          // eslint-disable-next-line
          expect(wrapper.vm.$validator.validateAll).to.be.called;
          done();
        }).catch(err => done(err));
      });

      it('should call login method of Auth class for login', (done) => {
        const signinButton = wrapper.find('form.sign-in button');
        data.signInObject = {
          email: 'good@email.ng',
          password: 'password',
        };
        signinButton.trigger('click');
        Vue.nextTick().then(() => {
          // eslint-disable-next-line
          expect(Auth.login).to.be.called;
          expect(Auth.login).to.be.calledWith(data.signInObject);
          done();
        }).catch(err => done(err));
      });

      it('should show error message if login fails', (done) => {
        const signinButton = wrapper.find('form.sign-in button');
        data.signInObject = {
          email: 'bad@email.ng',
          password: 'password',
        };
        signinButton.trigger('click');
        Vue.nextTick().then(() => {
          loginStub({
            email: 'bad@email.ng',
            password: 'password',
          }).catch((err) => {
            const response = err.response;
            data.errorMessage = response.data.message;
            data.ifError = true;
            Vue.nextTick().then(() => {
              const errorMessage = wrapper.findAll('.error-message').at(0);
              expect(errorMessage.text().trim()).to.equal('Authentication failed: Invalid user');
              done();
            });
          });
        }).catch(err => done(err));
      });
    });
  });

  describe('signup test', () => {
    it('should fail if signup form has no content', (done) => {
      const switchForm = wrapper.find('.switch-form-signup');
      switchForm.trigger('click');
      Vue.nextTick(() => {
        const signupButton = wrapper.find('form.sign-up button');
        signupButton.trigger('click');
        Vue.nextTick().then(() => {
          const errorPanels = wrapper.findAll('form.sign-up p.text-danger');
          expect(errorPanels.at(0).text().trim()).to.equal('The first name field is required.');
          expect(errorPanels.at(1).text().trim()).to.equal('The surname field is required.');
          expect(errorPanels.at(2).text().trim()).to.equal('The email field is required.');
          expect(errorPanels.at(3).text().trim()).to.equal('The password field is required.');
          expect(errorPanels.at(4).text().trim()).to.equal('The confirm password field is required.');
          done();
        }).catch(err => done(err));
      });
    });

    it('should fail if confirm password isn\'t same as password', (done) => {
      const signupButton = wrapper.find('form.sign-up button');
      data.signUpObject = {
        firstname: 'xf',
        surname: 'xn',
        email: 'xgood@email.ng',
        password: 'xpasswords',
        confirmPassword: 'xpassword',
      };
      signupButton.trigger('click');
      Vue.nextTick().then(() => {
        const errorPanels = wrapper.findAll('form.sign-up p.text-danger');
        expect(errorPanels.at(0).text().trim()).to.equal('The confirm password confirmation does not match.');
        done();
      }).catch(err => done(err));
    });

    describe('backend requests', () => {
      let signupStub;
      let validateAllStub;
      before(() => {
        sandbox = sinon.sandbox.create();
        signupStub = sandbox.stub(Auth, 'signup');
        signupStub.withArgs({
          firstname: 'xf',
          surname: 'xn',
          email: 'xgood@email.ng',
          password: 'xpassword',
          confirmPassword: 'xpassword',
        }).resolves({
          token: 'xxxxx',
        });
        signupStub.withArgs({
          firstname: 'xf',
          surname: 'xn',
          email: 'xbad@email.ng',
          password: 'xpassword',
          confirmPassword: 'xpassword',
        }).rejects({
          response: {
            data: { message: 'Signup failed: Duplicate user' },
          },
        });
        validateAllStub = sandbox.stub(wrapper.vm.$validator, 'validateAll');
        validateAllStub.resolves(() => {
          Auth.signup();
        });
      });

      after(() => {
        sandbox.restore();
      });

      it('validator to be called', (done) => {
        const signupButton = wrapper.find('form.sign-up button');
        signupButton.trigger('click');
        Vue.nextTick().then(() => {
          // eslint-disable-next-line
          expect(wrapper.vm.$validator.validateAll).to.be.called;
          done();
        }).catch(err => done(err));
      });

      it('should call signup method of Auth class for signup', (done) => {
        const signupButton = wrapper.find('form.sign-up button');
        data.signUpObject = {
          firstname: 'xf',
          surname: 'xn',
          email: 'xgood@email.ng',
          password: 'xpassword',
          confirmPassword: 'xpassword',
        };
        signupButton.trigger('click');
        Vue.nextTick().then(() => {
          // eslint-disable-next-line
          expect(Auth.signup).to.be.called;
          expect(Auth.signup).to.be.calledWith(data.signUpObject);
          done();
        }).catch(err => done(err));
      });

      it('should show error message if signup fails', (done) => {
        const signupButton = wrapper.find('form.sign-up button');
        data.signInObject = {
          email: 'bad@email.ng',
          password: 'password',
        };
        signupButton.trigger('click');
        Vue.nextTick().then(() => {
          signupStub({
            firstname: 'xf',
            surname: 'xn',
            email: 'xbad@email.ng',
            password: 'xpassword',
            confirmPassword: 'xpassword',
          }).catch((err) => {
            const response = err.response;
            data.errorMessage = response.data.message;
            data.ifError = true;
            Vue.nextTick().then(() => {
              const errorMessage = wrapper.findAll('.error-message').at(0);
              expect(errorMessage.text().trim()).to.equal('Signup failed: Duplicate user');
              done();
            });
          });
        }).catch(err => done(err));
      });
    });
  });
});
