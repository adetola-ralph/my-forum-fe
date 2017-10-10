import Vue from 'vue';
import VueValidate from 'vee-validate';
import { mount } from 'vue-test-utils';
import Authentication from '@/components/authentication/authentication';

// eslint-disable-next-line
let wrapper;
let data;

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
});
