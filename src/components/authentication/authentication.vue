<template>
  <div class="authentication-page">
    <div class="logo"></div>
    <div class="panel panel-default">
      <div class="panel-body">
        <form class="sign-in" v-if="signIn" data-vv-scope="login">
          <div class="form-group">
            <label for="email" class="ccontrol-label">Email:</label>
            <input type="email" 
                   class="form-control" 
                   id="email" 
                   placeholder="Email"
                   name="signinEmail"
                   data-vv-as="email"
                   v-validate="'required|email'"
                   v-model="signInObject.email">
            <p class="text-danger" v-if="errors.has('login.signinEmail')">
              {{ errors.first('login.signinEmail') }}
            </p>
          </div>
          <div class="form-group">
            <label for="password" class="control-label">Password:</label>
            <input type="password" 
                   class="form-control" 
                   id="password" 
                   placeholder="Password"
                   name="signinPassword"
                   data-vv-as="password"
                   v-validate="'required'"
                   v-model="signInObject.password">
            <p class="text-danger" v-if="errors.has('login.signinPassword')">
              {{ errors.first('login.signinPassword') }}
            </p>
          </div>
          <div class="form-group">
            <div class="text-danger" v-if="ifError">
              {{errorMessage}}
            </div>
          </div>
          <button class="btn btn-default" @click.prevent="login()">Login</button>
        </form>
        <form class="sign-up" v-if="!signIn">
          <div class="form-group">
            <label for="firstname" class="control-label">Firstname</label>
            <input type="text" class="form-control" id="firstname" placeholder="Firstname" v-model="signUpbject.firstname">
          </div>
          <div class="form-group">
            <label for="surname" class="control-label">Surname</label>
            <input type="text" class="form-control" id="surname" placeholder="Surname" v-model="signUpbject.surname">
          </div>
          <div class="form-group">
            <label for="signup-email" class="control-label">Email</label>
            <input type="email" class="form-control" id="signup-email" placeholder="Email" v-model="signUpbject.email">
          </div>
          <div class="form-group">
            <label for="signup-password" class="control-label">Password:</label>
            <input type="password" class="form-control" id="signup-password" placeholder="Password" v-model="signUpbject.password">
          </div>
          <div class="form-group">
            <label for="confirm-password" class="control-label">Password:</label>
            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" v-model="signUpbject.confirmPassword">
          </div>
          <div class="form-group">
            <div class="text-danger" v-if="ifError">
              {{errorMessage}}
            </div>
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
  import Authentication from './../../utilities/auth';

  export default {
    name: 'authentication',
    data() {
      return {
        errorMessage: '',
        ifError: false,
        signIn: true,
        signInObject: {
          email: '',
          password: '',
        },
        signUpbject: {
          firstname: '',
          surname: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      };
    },
    methods: {
      changeAuth() {
        this.signIn = !this.signIn;
      },
      login() {
        this.ifError = false;
        this.$validator.validateAll('login').then((result) => {
          if (result) {
            Authentication.login(this.signInObject)
            .then((res) => {
              const token = res.data.data.token;
              this.$cookies.set('token', token, '3D');
              this.$cookies.set('authenticated', true);
              this.$router.push({ name: 'Home' });
            })
            .catch((err) => {
              const response = err.response;
              this.errorMessage = response.data.message;
              this.ifError = true;
            });
          }
        });
      },
      signup() {

      },
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$cookies.remove('token');
        vm.$cookies.set('authenticated', false);
      });
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
      height: 150px;
      width: 150px;
      background-image: url('./../../assets/my-forum.png');
      background-size: contain;
      background-repeat: no-repeat;
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
