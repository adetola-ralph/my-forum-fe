import { mount, createLocalVue, shallow } from 'vue-test-utils';
import VueRouter from 'vue-router';
import moment from 'moment';
import TopicList from '@/components/topic-list/topic-list';
import Topic from '@/utilities/topics';

let wrapper;
let vm;
let sandbox;
let getAllTopicStub;
const Vue = createLocalVue();
const router = new VueRouter();
// Vue.use(VueRouter);
const data = {
  data: {
    data: [
      {
        id: 1,
        topicName: 'topicName',
        userId: 1,
        createdAt: new Date(2017, 11, 30),
        User: {
          name: 'Firstname Surname',
        },
      },
      {
        id: 2,
        topicName: 'topicName2',
        userId: 1,
        createdAt: new Date(2017, 12, 1),
        User: {
          name: 'Firstname Surname',
        },
      },
    ],
  },
};

describe('TopicList.vue', () => {
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  before(() => {
    wrapper = mount(TopicList, {
      localVue: Vue,
      router,
    });
    vm = wrapper.vm;
    getAllTopicStub = sandbox.stub(Topic, 'getAll');
    getAllTopicStub.resolves(data);
  });

  after(() => {
    sandbox.restore();
  });

  it('contains getTopics method', () => {
    const shallowMount = shallow(TopicList, {
      methods: {
        getTopics: () => 'test',
      },
    });
    expect(shallowMount.vm.getTopics()).to.equal('test');
  });

  it('contains topics as part of data', () => {
    expect(vm).to.have.property('topics');
  });

  it('getTopics method', (done) => {
    vm.getTopics();
    vm.$nextTick().then(() => {
      expect(vm.topics[0].id).to.equal(1);
      expect(vm.topics[0].createdAt).to.equal(moment(data.data.data[0].createdAt)
        .format('ll'));
      expect(vm.topics[0].author).to.equal('Firstname Surname');
      done();
    });
  });

  it('clicking on a topic redirects to the topic page', (done) => {
    sandbox.spy(vm, 'goToTopic');
    sandbox.spy(vm.$router, 'push');

    const firstTopic = wrapper.findAll('.topic-list-heading').at(0);
    firstTopic.trigger('click');
    vm.$nextTick().then(() => {
      // eslint-disable-next-line
      expect(vm.goToTopic).to.be.called;
      // eslint-disable-next-line
      expect(vm.$router.push).to.be.called;
      done();
    }).catch((err) => {
      done(err);
    });
  });
});
