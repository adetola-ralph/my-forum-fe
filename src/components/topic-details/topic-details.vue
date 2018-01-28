<template>
  <div>
    <div class="page-header">
      <h1>{{topic.topicName}}</h1>
    </div>
    <div>
      <div class="lists" v-for="post in posts" :key="post.id" v-if="posts.length > 0">
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
      <div class="no-content lists" v-if="posts.length === 0">
        No Posts under this topic.
    </div>
      <div class="lists new-post">
        <form data-vv-scope="newPost">
          <div class="form-group">
            <textarea name="newPost" 
              id="new-post" 
              class="form-control"
              v-validate="'required'"
              data-vv-as="New Post"
              v-model="newPost"></textarea>
              <p class="text-danger" v-if="errors.has('newPost.newPost')">
                Please enter content in the field above
              </p>
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="createNewPost()">Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Posts from './../../utilities/posts';
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

