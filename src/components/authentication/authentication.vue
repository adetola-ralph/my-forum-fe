<template>
  <div class="authentication-page">
    <div class="logo">Logo</div>
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="sign-in" v-if="signIn">
          <div class="form-group">
            <label for="email" class="ccontrol-label">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password" class="control-label">Password:</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button class="btn btn-default">Login</button>
        </form>
        <form class="sign-up" v-if="!signIn">
          <div class="form-group">
            <label for="firstname" class="control-label">Firstname</label>
            <input type="text" class="form-control" id="firstname" placeholder="Firstname">
          </div>
          <div class="form-group">
            <label for="surname" class="control-label">Surname</label>
            <input type="text" class="form-control" id="surname" placeholder="Surname">
          </div>
          <div class="form-group">
            <label for="signup-email" class="control-label">Email</label>
            <input type="email" class="form-control" id="signup-email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="signup-password" class="control-label">Password:</label>
            <input type="password" class="form-control" id="signup-password" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="confirm-password" class="control-label">Password:</label>
            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password">
          </div>
          <button class="btn btn-default">Register</button>
        </form>
      </div>
    </div>
    <div v-if="!signIn">
      Have an Account, Sign in <a href @click.prevent = "changeAuth()">here</a>
    </div>
    <div v-if="signIn">
      Don't have an Account, Sign up <a href @click.prevent = "changeAuth()">here</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'authentication',
    data() {
      return {
        signIn: true,
      };
    },
    methods: {
      changeAuth() {
        this.signIn = !this.signIn;
      },
    },
  };
</script>
<style lang="scss" scoped>
  $base-green: #85FFBD;
  $base-yellow: #FFFB7D;
  $medium-width: 768px;
  $small-width: 480px;
  .authentication-page {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logo{
      margin-bottom: 20px;
    }
    .panel {
      @media all and (min-width: $medium-width) {
        width: 33%;
      }
      @media all and (min-width: $small-width) and (max-width: $medium-width) {
        width: 60%;
      }
      @media all and (max-width: $small-width) {
        width: 95%;
      }
      .btn {
        width: 100%;
      }
    }
  }
</style>
