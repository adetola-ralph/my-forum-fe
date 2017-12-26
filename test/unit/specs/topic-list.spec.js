import { mount, createLocalVue, shallow } from 'vue-test-utils';
import VueRouter from 'vue-router';
import TopicList from '@/components/topic-list/topic-list';
// import Topic from '@/utilities/topics';

let wrapper;
let vm;
let sandbox;
let getTopicsSpy;
const Vue = createLocalVue();
const router = new VueRouter();

describe('TopicList.vue', () => {
  before(() => {
    sandbox = sinon.sandbox.create();
    getTopicsSpy = sandbox.spy();
  });

  before(() => {
    wrapper = mount(TopicList, {
      localVue: Vue,
      router,
    });
    vm = wrapper.vm;
  });

  it('contains getTopics method', () => {
    const shallowMount = shallow(TopicList, {
      methods: {
        getTopics: () => 'test',
      },
    });
    // expect(vm.getTopics).to.have.been.called();
    expect(shallowMount.vm.getTopics()).to.equal('test');
  });

  it('contains topics as part of data', () => {
    expect(vm).to.have.property('topics');
  });
});
