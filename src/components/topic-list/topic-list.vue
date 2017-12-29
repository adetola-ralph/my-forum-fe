<template>
  <div>
    <div class="page-header">
      <h1>Topics</h1>
    </div>
    <div class="topic-list" v-for="topic in topics" :key="topic.id">
      <p class="topic-list-heading">{{topic.topicName}}</p>
      <span class="tags-list">
        <ul class="tags">
          <li>Tag 1</li>
          <li>Tag 2</li>
          <li>Tag 3</li>
        </ul>
      </span>
      <span class="topic-info">
        by {{topic.author}} at {{topic.createdAt}}
      </span>
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
  },
  mounted() {
    this.getTopics();
  },
};
</script>

<style lang="scss">
  .topic-list {
    color: #797979;
    padding: 20px 30px 10px;
    border-radius: 4px;
    position: relative;
    margin-bottom: 20px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.06), 0 1px 0 0 rgba(0,0,0,.02);
    background-color: #fff;

    .topic-list-heading {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 10px;
      box-sizing: border-box;
    }

    .tags {
      list-style: none;
      display: inline-block;
      padding-left: 0;

      li {
        display: inline-block;
        text-transform: capitalize;
        padding: 3px 5px;
        margin-right: 5px;
        background-color: lighten(#85FFBD, 15%);
        color: darken(#85FFBD, 30%);
        cursor: pointer;
        transition: background-color 0.5s;

        &:hover {
          background-color: darken(#85FFBD, 1%);
        }
      }

    }

    .topic-info {
      float: right;
    }
  }
</style>

