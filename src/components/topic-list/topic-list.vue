<template>
  <div>
    <div class="page-header">
      <h1>Topics</h1>
    </div>
    <div>
      <div class="topic-list" v-for="topic in topics" :key="topic.id">
        <p class="topic-list-heading">{{topic.topicName}}</p>
        <div class="topic-meta">
          <span class="topic-info">
            <a class="author">
              <img :src="getUserAvatar(topic)" alt="User image" class="author-image"/>
              {{topic.author}}
            </a> 
            at {{topic.createdAt}}
          </span>
          <span class="tags-list">
            <ul class="tags">
              <li>Tag 1</li>
              <li>Tag 2</li>
              <li>Tag 3</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Topics from './../../utilities/topics';

export default {
  name: 'TopicList',
  data() {
    return {
      topics: [],
    };
  },
  methods: {
    getTopics() {
      return Topics.getAll().then((res) => {
        const topics = res.data.data;
        this.topics = topics.map((topic) => {
          const modifiedTopic = Object.assign({}, topic);
          modifiedTopic.createdAt = moment(topic.createdAt).format('ll');
          modifiedTopic.author = topic.User.name;
          return modifiedTopic;
        });
      });
    },
    getUserAvatar(topic) {
      // eslint-disable-next-line
      return topic.User.profilePicture || require('./../../assets/icons/user-solid-circle.svg');
    },
  },
  mounted() {
    this.getTopics();
  },
};
</script>

<style lang="scss">
@import 'src/styles/base.scss';
  .topic-list {
    @extend .lists;

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-bottom: #f1f3f5 1px solid;
    }

    .topic-list-heading {
      @extend.lists-heading;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
      color: darken(#85FFBD, 40%);

      &-image {
        max-width: 17px;
        border-radius: 50%;
        vertical-align: sub;
      }
    }

    .tags {
      list-style: none;
      display: inline-block;
      padding-left: 10px;

      li {
        display: inline-block;
        text-transform: capitalize;
        font-size: 10px;
        padding: 2px 3px;
        margin-right: 5px;
        background-color: lighten(#85FFBD, 20%);
        color: darken(#85FFBD, 30%);
        cursor: pointer;
        transition: background-color 0.5s;

        &:hover {
          background-color: darken(#85FFBD, 1%);
        }
      }

    }

    .topic-info {
      color: #636f7b;
      font-weight: 400;
      font-size: 12px;

    }
  }
</style>

