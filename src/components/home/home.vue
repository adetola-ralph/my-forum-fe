<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <div class="logo"></div>
        </a>
      </div>
      <!-- <div class=""> -->
      <ul class="nav navbar-nav navbar-right hidden-xs">
        <li class="dropdown">
          <a href class="dropdown-toggle profile-picture" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            <div class="profile-picture-holder">
              <img src="./../../assets/placeholder.jpg" alt="Profile picture">
            </div>
          </a>
          <ul class="dropdown-menu">
            <li><a href>Profile</a></li>
            <li><a href @click.prevent="logout()">Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {
      };
    },
    methods: {
      logout() {
        this.$cookies.remove('token');
        this.$cookies.set('authenticated', false);
        this.$router.push({ name: 'Auth' });
      },
    },
    computed: {
      authenticated() {
        return this.$cookies.get('authenticated');
      },
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (!(vm.$cookies.get('authenticated') && vm.$cookies.get('token'))) {
          next('auth');
        }
      });
    },
  };
</script>
<style lang="scss">
  .navbar {
    height: 60px;
    padding-left: 10px;
    padding-right: 10px;
    .navbar-brand {
      padding: 5px 5px 5px 0;
      .logo{
        height: 50px;
        width: 50px;
        background-image: url('./../../assets/my-forum-200x200.png');
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .nav.navbar-nav {
      height: 60px;
      > li {
        height: 60px;
        > a {
          padding-top: 20px;
          padding-bottom: 20px;
          }
      }
      .profile-picture {
        border-radius: 50px;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 50px;
        width: 50px;
        padding: 0;
        img {
          border-radius: 50px;
          height: 50px;
          width: 50px;
        }
      }
    }
    .navbar-text {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .navbar-right {
      margin-right: 0;
    }
  }
  .main-content {
    margin-top: 60px;
  }
</style>
