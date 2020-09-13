<template>
  <div class="login">
    <h3>Welcome to Life Design!!</h3>

    <div class="login-btn" v-on:click="login">Google Log in</div>
  </div>
</template>
<script>
import firebase from "firebase"
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.push("/profile/edit")
        })
    }
  }
}
</script>
<style lang="scss">
.login {
  h3 {
    padding: 20px 0px;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
  }
  .login-btn {
    font-size: 20px;
    font-weight: bold;
    padding: 6px;
    // border: 1px solid black;
    color: white;
    background: rgba(29, 161, 242, 1);
  }
}
</style>
