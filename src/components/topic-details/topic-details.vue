<template>
  <div>
    <div class="page-header">
      <h1>{{topic.topicName}}</h1>
    </div>
    <div v-if="posts.length > 0">
      <div class="lists" v-for="post in posts" :key="post.id">
        <p class="lists-heading">{{post.content}}</p>
        <div class="meta">
          <span class="info">
            <a class="author">
              <img :src="getUserAvatar(post)" alt="User image" class="author-image"/>
              {{post.author}}
            </a> 
            at {{post.createdAt}}
          </span>
        </div>
      </div>
    </div>
    <div class="no-content" v-if="posts.length === 0">
      No Posts under this topic.
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Topics from './../../utilities/topics';

export default {
  name: 'TopicDetails',
  props: ['topicId'],
  data() {
    return {
      topic: {},
      posts: [],
    };
  },
  methods: {
    getTopicAndPosts() {
      return Topics.getOne(this.topicId).then(([rTopic, rPosts]) => {
        const topic = rTopic.data.data;
        const posts = rPosts.data.data;

        this.posts = posts.map((post) => {
          const modifiedPost = Object.assign({}, post);
          modifiedPost.createdAt = moment(post.createdAt).format('ll');
          modifiedPost.author = post.User.name;
          return modifiedPost;
        });

        this.topic = Object.assign(topic, {
          createdAt: moment(topic.createdAt).format('ll'),
          author: topic.User.name,
        });
      });
    },
    getUserAvatar(post) {
      // eslint-disable-next-line
      return post.User.profilePicture || require('./../../assets/icons/user-solid-circle.svg');
    },
  },
  mounted() {
    this.getTopicAndPosts();
  },
};
</script>

<style lang="scss">
</style>

