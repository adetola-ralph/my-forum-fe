import { mount, createLocalVue, shallow } from 'vue-test-utils';
import VueRouter from 'vue-router';
import moment from 'moment';
import TopicDetails from '@/components/topic-details/topic-details';
import Topic from '@/utilities/topics';

let wrapper;
let vm;
let sandbox;
let getOneStub;
const Vue = createLocalVue();
const router = new VueRouter();

const mockTopic = {
  id: 2,
  topicName: 'topicName2',
  userId: 1,
  createdAt: new Date(),
};

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

describe('TopicDetails.vue', () => {
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  before(() => {
    wrapper = mount(TopicDetails, {
      localVue: Vue,
      router,
      propsData: {
        topicId: 2,
      },
    });
    vm = wrapper.vm;
    getOneStub = sandbox.stub(Topic, 'getOne');
    getOneStub.resolves([mockTopic, mockPosts]);
  });

  after(() => {
    sandbox.restore();
  });

  it('contains getTopicsAndPosts method', () => {
    const shallowMount = shallow(TopicDetails, {
      methods: {
        getTopicsAndPosts: () => 'test',
      },
    });

    expect(shallowMount.vm.getTopicsAndPosts).to.be.a('function');
    expect(shallowMount.vm.getTopicsAndPosts()).to.equal('test');
  });

  it('contains topic and posts', () => {
    expect(vm).to.have.property('topic');
    expect(vm).to.have.property('posts');
  });

  it('getTopicsAndPosts', () => {
    vm.getTopicAndPosts();
    vm.$nextTick().then(() => {
      expect(vm.topic).to.have.proprty('id', 2);
      expect(vm.topic.createdAt).to.equal(moment(mockTopic.createdAt).format('ll'));
      expect(vm.posts[0]).to.have.property('author', 'Olutola Oreofeoluwapo');
    });
  });
});
